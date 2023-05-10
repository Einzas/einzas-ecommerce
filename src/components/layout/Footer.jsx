import React from "react";

const Footer = () => {
  return (
    <footer className="h-40 w-full bg-[#4f4f4f] grid place-content-center text-white">
      <span className="text-center">© Einzas</span>
      <div className="flex gap-3 justify-center mt-4 ">
        <a
          href="https://www.linkedin.com/in/jeimy-jara-bautista-37383a240/"
          target="_blank"
        >
          <i className="bg-zinc-700 hover:bg-zinc-500 cursor-pointer p-3 rounded-full bx bxl-linkedin"></i>
        </a>
        <a href="https://github.com/Einzas/" target="_blank">
          <i className="bg-zinc-700 hover:bg-zinc-500 cursor-pointer p-3 rounded-full bx bxl-github"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
