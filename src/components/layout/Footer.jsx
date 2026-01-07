import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Compact Single Row Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Brand & Copyright */}
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-600 flex items-center gap-1">
              © {currentYear}{" "}
              <span className="font-semibold text-gray-900">TaskForge</span>
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href="#about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="#privacy"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Privacy
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="#terms"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Terms
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="#contact"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Saroj05Dev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://x.com/Saroj05Dev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/saroj-kumar-das-86a36b30a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
