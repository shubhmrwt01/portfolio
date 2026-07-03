import React from "react";
import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center md:items-start items-center">
          {/* <a href="/">Visit my blog</a> */}
        </div>
        <div className="socials">
          {socialImgs.map((img) => (
            <a
              className="icon relative group/tooltip"
              target="_blank"
              href={img.url}
              rel="noopener noreferrer"
              key={img.url}
              aria-label={img.name}
            >
              <img src={img.imgPath} className="size-6" alt={img.name} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black-200 text-white-50 text-xs opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {img.name}
              </span>
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Shubham Rawat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
