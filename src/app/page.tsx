export default function Home() {
  const contacts = [
    { name: "Email", href: "mailto:janlancelotm@gmail.com" },
    { name: "GitHub", href: "https://github.com/JanLancelot", target: "_blank" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/jan-lancelot-mailig-b43949392", target: "_blank" },
  ];

  return (
    <div className="flex flex-col gap-7 justify-end flex-1">
      {/* Header Bio Intro */}
      <header className="max-w-xl animate-fade-in">
        <h1 className="text-zinc-800 dark:text-zinc-200 text-lg leading-relaxed font-normal">
          I&apos;m <span className="font-semibold text-black dark:text-white">Lancelot Mailig</span>.
          Developer, designer, and content creator. This is my portfolio.
        </h1>
      </header>

      {/* Contacts */}
      <div className="flex flex-col gap-4 animate-fade-down animation-delay-100 max-w-xl">
        <h2 className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-mono font-medium">
          Get in touch
        </h2>
        <div className="flex gap-5 text-sm">
          {contacts.map((contact) => (
            <a
              key={contact.name}
              href={contact.href}
              target={contact.target}
              rel={contact.target ? "noopener noreferrer" : undefined}
              className="minimal-link font-medium text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              {contact.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
