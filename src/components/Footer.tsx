import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-1">
          <a
            href="https://discord.gg/tBPFYTha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-xl"
            aria-label="Discord 참여하기"
          >
            <FaDiscord />
          </a>
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} 테일즈위키. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
