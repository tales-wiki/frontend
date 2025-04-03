import { FaDiscord, FaEnvelope, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://discord.gg/57Cp6uCkp8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-slate-100 transition-colors"
            >
              <FaDiscord size={24} />
            </a>
            <a
              href="https://github.com/tales-wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-slate-100 transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="mailto:suhwan@kakao.com"
              className="text-slate-300 hover:text-slate-100 transition-colors"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
          <p className="text-slate-300 text-sm">
            &copy; {new Date().getFullYear()} Tales Wiki. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
