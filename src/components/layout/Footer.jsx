import { Github, Twitter, Linkedin, CheckSquare } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Tasks", href: "/tasks" },
    { label: "Activity Log", href: "/activity" },
  ],
  Resources: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Contact", href: "#contact" },
  ],
};

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Saroj05Dev",
    icon: Github,
  },
  {
    label: "Twitter / X",
    href: "https://x.com/Saroj05Dev",
    icon: Twitter,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/saroj-kumar-das-86a36b30a/",
    icon: Linkedin,
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="shrink-0 bg-white border-t border-gray-100">
      {/* Main footer content */}
      <div className="px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand column */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-black tracking-tight leading-none select-none">TF</span>
            </div>
            <span className="text-sm font-bold text-gray-900">TaskForge</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
            A collaborative task management platform built for modern teams.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-1 mt-1">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-150"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section} className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">
              {section}
            </p>
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-gray-500 hover:text-blue-600 transition-colors w-fit"
              >
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="px-6 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-1.5">
        <p className="text-xs text-gray-400">
          © {year} TaskForge. All rights reserved.
        </p>
        <p className="text-xs text-gray-400">
          Built with React, Node.js & MongoDB
        </p>
      </div>
    </footer>
  );
};

export default Footer;
