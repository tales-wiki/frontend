import React from "react";
import { FaDiscord, FaEnvelope, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://discord.gg/57Cp6uCkp8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaDiscord size={24} />
            </a>
            <a
              href="https://github.com/tales-wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="mailto:suhwan@kakao.com"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Tales Wiki. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
