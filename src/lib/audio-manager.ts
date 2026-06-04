// Client-side Audio Manager using Web Audio API for procedural ambient synthesis
// Designed to be zero-dependency, high performance, and SSR-safe.

export interface AudioPreset {
  name: string;
  description: string;
  chords: number[][]; // Frequencies for chords
}

// Preset chords frequencies (Hz)
export const AUDIO_PRESETS: AudioPreset[] = [
  {
    name: "Resonance",
    description: "Nostalgic retro ambient pad",
    // Cmaj7 (C3, G3, B3, E4) -> Fmaj7 (F3, C4, E4, A4)
    chords: [
      [130.81, 196.00, 246.94, 329.63], // C3, G3, B3, E4
      [174.61, 261.63, 329.63, 440.00], // F3, C4, E4, A4
    ],
  },
  {
    name: "Midnight Drift",
    description: "Deep space low-frequency drone",
    // Am9 (A2, E3, G3, C4, B4) -> Dm9 (D3, A3, C4, F4, E5)
    chords: [
      [110.00, 164.81, 196.00, 261.63, 493.88], // A2, E3, G3, C4, B4
      [146.83, 220.00, 261.63, 349.23, 659.25], // D3, A3, C4, F4, E5
    ],
  },
  {
    name: "Dream State",
    description: "Ethereal shimmering crystal keys",
    // Emaj9 (E3, B3, D#4, F#4) -> Amaj9 (A2, E3, G3#, B3, C#4)
    chords: [
      [164.81, 246.94, 311.13, 369.99, 659.25], // E3, B3, D#4, F#4, E5
      [110.00, 164.81, 207.65, 246.94, 554.37], // A2, E3, G#3, B3, C#5
    ],
  },
];

class AudioManager {
  private ctx: AudioContext | null = null;
  private analyserNode: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayFeedbackGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private filterLfo: OscillatorNode | null = null;
  private filterLfoGain: GainNode | null = null;
  
  // Track active oscillators and their gain nodes
  private activeOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private currentChordIndex = 0;
  private chordInterval: NodeJS.Timeout | null = null;
  
  public isPlaying = false;
  public currentPresetIndex = 0;
  public volume = 0.5; // Default 50%
  
  // Callbacks for UI sync
  private onStateChangeCallbacks: (() => void)[] = [];

  constructor() {
    // SSR Safe
    if (typeof window !== "undefined") {
      // Lazy init will happen on first user interaction
    }
  }

  public registerCallback(cb: () => void) {
    this.onStateChangeCallbacks.push(cb);
  }

  public unregisterCallback(cb: () => void) {
    this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter((c) => c !== cb);
  }

  private notify() {
    this.onStateChangeCallbacks.forEach((cb) => cb());
  }

  private initAudio() {
    if (this.ctx) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContextClass();
    
    // Master volume gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime); // keep overall synth volume soft

    // Lowpass filter
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = "lowpass";
    this.filterNode.Q.setValueAtTime(3.0, this.ctx.currentTime);
    this.filterNode.frequency.setValueAtTime(650, this.ctx.currentTime);

    // Filter modulation LFO (creates a slow sweeps/breathing effect)
    this.filterLfo = this.ctx.createOscillator();
    this.filterLfo.type = "sine";
    this.filterLfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // very slow 0.08 Hz

    this.filterLfoGain = this.ctx.createGain();
    this.filterLfoGain.gain.setValueAtTime(250, this.ctx.currentTime); // sweep range

    this.filterLfo.connect(this.filterLfoGain);
    this.filterLfoGain.connect(this.filterNode.frequency);
    this.filterLfo.start();

    // Delay line for spacious feedback echo
    this.delayNode = this.ctx.createDelay(1.0);
    this.delayNode.delayTime.setValueAtTime(0.45, this.ctx.currentTime); // 450ms delay
    
    this.delayFeedbackGain = this.ctx.createGain();
    this.delayFeedbackGain.gain.setValueAtTime(0.4, this.ctx.currentTime); // 40% feedback

    // Connect delay circuit
    this.filterNode.connect(this.delayNode);
    this.delayNode.connect(this.delayFeedbackGain);
    this.delayFeedbackGain.connect(this.delayNode); // feedback loop

    // Analyser node for Three.js animations
    this.analyserNode = this.ctx.createAnalyser();
    this.analyserNode.fftSize = 128; // small FFT size for performance and responsive shapes
    
    // Mix dry (filter) and wet (delay) sounds into analyser
    this.filterNode.connect(this.analyserNode);
    this.delayNode.connect(this.analyserNode);

    // Connect Analyser to Master Gain
    this.analyserNode.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
  }

  public async start() {
    if (this.isPlaying) return;

    this.initAudio();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    this.isPlaying = true;
    this.currentChordIndex = 0;
    
    // Play first chord immediately
    this.playChord(AUDIO_PRESETS[this.currentPresetIndex].chords[0]);
    
    // Schedule chord transitions every 7 seconds
    this.chordInterval = setInterval(() => {
      if (!this.ctx) return;
      const preset = AUDIO_PRESETS[this.currentPresetIndex];
      this.currentChordIndex = (this.currentChordIndex + 1) % preset.chords.length;
      this.playChord(preset.chords[this.currentChordIndex]);
    }, 7000);

    this.notify();
  }

  public stop() {
    if (!this.isPlaying) return;

    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }

    // Fade out and stop all active oscillators
    const fadeTime = 2.0; // 2 seconds fade out
    const now = this.ctx ? this.ctx.currentTime : 0;
    
    this.activeOscs.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + fadeTime);
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        }, fadeTime * 1000 + 100);
      } catch (e) {
        try {
          osc.stop();
        } catch (err) {}
      }
    });

    this.activeOscs = [];
    this.isPlaying = false;
    this.notify();
  }

  private playChord(frequencies: number[]) {
    if (!this.ctx || !this.filterNode) return;
    const now = this.ctx.currentTime;
    const fadeOutTime = 1.8;
    const fadeInTime = 2.0;

    // Fade out previous oscillators
    const oldOscs = [...this.activeOscs];
    this.activeOscs = [];

    oldOscs.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + fadeOutTime);
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (err) {}
        }, fadeOutTime * 1000 + 100);
      } catch (e) {
        try {
          osc.stop();
        } catch (err) {}
      }
    });

    // Spawn new oscillators for the new chord
    frequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.filterNode) return;

      // Detuned pair (creates beautiful thick chorus pad)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      
      const gainNode = this.ctx.createGain();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(freq, now);
      // Soft detuning
      osc1.detune.setValueAtTime(-6 - idx * 2, now);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 2, now); // Add a subtle octave harmonic
      osc2.detune.setValueAtTime(6 + idx * 2, now);

      // Connect oscillators to gain
      gainNode.gain.setValueAtTime(0.0001, now);
      // Individual note volumes: slightly quieter for higher frequencies
      const targetVolume = (0.16 / frequencies.length) * (1 - (idx * 0.1));
      
      gainNode.gain.exponentialRampToValueAtTime(targetVolume, now + fadeInTime);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(this.filterNode);

      osc1.start(now);
      osc2.start(now);

      this.activeOscs.push({ osc: osc1, gain: gainNode });
      this.activeOscs.push({ osc: osc2, gain: gainNode });
    });
  }

  public setPreset(index: number) {
    if (index < 0 || index >= AUDIO_PRESETS.length) return;
    this.currentPresetIndex = index;
    
    if (this.isPlaying) {
      // Reset chord cycle
      this.currentChordIndex = 0;
      if (this.chordInterval) {
        clearInterval(this.chordInterval);
      }
      this.playChord(AUDIO_PRESETS[index].chords[0]);
      
      this.chordInterval = setInterval(() => {
        if (!this.ctx) return;
        const preset = AUDIO_PRESETS[this.currentPresetIndex];
        this.currentChordIndex = (this.currentChordIndex + 1) % preset.chords.length;
        this.playChord(preset.chords[this.currentChordIndex]);
      }, 7000);
    }
    
    this.notify();
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      // Linear transition for volume is smoother and sounds natural
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      // Keep master volume multiplier low so it doesn't blast
      this.masterGain.gain.linearRampToValueAtTime(this.volume * 0.15, now + 0.1);
    }
    this.notify();
  }

  public getAnalyserData(): Uint8Array {
    if (!this.analyserNode) {
      return new Uint8Array(0);
    }
    const bufferLength = this.analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyserNode.getByteFrequencyData(dataArray);
    return dataArray;
  }
}

// Global Singleton (safely client-only)
let audioManagerInstance: AudioManager | null = null;

export function getAudioManager(): AudioManager {
  if (typeof window === "undefined") {
    // Return a mock during SSR
    return new AudioManager();
  }
  if (!audioManagerInstance) {
    audioManagerInstance = new AudioManager();
  }
  return audioManagerInstance;
}
