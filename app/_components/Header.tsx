"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import microsoftLogo from "@/app/_assets/svg/Microsoft_logo.svg";
import xboxLogo from "@/app/_assets/svg/xbox_logo.svg";
import { navList } from "../_lib/Constants";
import { BiCart, BiSearch, BiUser } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    if (menuOpen && menuRef.current) {
      const items: Element[] = gsap.utils.toArray(menuRef.current.children);
      gsap.fromTo(
        items,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.3,
          ease: "power2.in",
        }
      );
    }
  }, [menuOpen]);

  const handleClose = () => {
    if (!menuRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => {
        setMenuOpen(false);
      },
    });

    const items: Element[] = gsap.utils.toArray(menuRef.current.children);
    tl.to(items, {
      x: 20,
      opacity: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <header className="absolute z-50 flex items-center justify-between w-full px-4 py-4 lg:px-8">
      <div className="flex items-center w-32 gap-x-4 md:w-1/3 lg:w-auto">
        <Image
          src={microsoftLogo}
          alt="Microsoft logo"
          width={128}
          height={40}
          sizes="(max-width: 768px) 100px, 128px"
        />
      </div>

      <nav className="relative flex items-center justify-between w-[calc(100%_-_128px)] md:w-2/3 lg:w-[calc(100%)]">
        <div className="w-2/3 translate-x-1/3 lg:ml-10 lg:w-10 lg:translate-x-0">
          <Image
            src={xboxLogo}
            alt="Xbox logo"
            height={40}
            width={40}
            sizes="(max-width: 768px) 40px , 40px"
          />
        </div>

        <div className="lg:hidden">
          <FiMenu
            size={28}
            className="cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        </div>

        <ul className="items-center hidden lg:flex lg:justify-between">
          {navList.map((li) => (
            <li
              className="lg:px-1 xl:px-3 py-1.5 cursor-pointer text-nowrap"
              key={li}
            >
              {li}
            </li>
          ))}
        </ul>

        <ul className="items-center hidden lg:flex lg:justify-between xl:gap-x-4 md:gap-x-2">
          <li className="font-boldcursor-pointer ">All Microsoft</li>
          <li className="flex items-center font-boldcursor-pointer gap-x-1">
            Search <BiSearch size={18} />
          </li>
          <li className="flex items-center font-boldcursor-pointer gap-x-1">
            Cart <BiCart size={18} />
          </li>
          <li className="flex items-center font-boldcursor-pointer gap-x-1">
            Account <BiUser size={18} />
          </li>
        </ul>
      </nav>

      {menuOpen && (
        <ul
          ref={menuRef}
          className="fixed h-dvh top-0 left-0 bg-background w-full flex flex-col items-start px-10 py-20 gap-y-4 lg:hidden z-40 *:opacity-0"
        >
          <li
            className="absolute duration-300 cursor-pointer top-10 right-10 text-primary hover:text-red-500"
            onClick={handleClose}
          >
            <IoClose size={40} />
          </li>

          {navList.map((li) => (
            <li
              key={li}
              className="flex items-center text-xl font-black duration-300 cursor-pointer group text-primary hover:text-white gap-x-2"
            >
              <span className="transition-all duration-300 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                <MdKeyboardDoubleArrowRight />
              </span>
              <span>{li}</span>
            </li>
          ))}

          <li className="flex items-center text-xl font-black duration-300 cursor-pointer group mt-7 text-primary hover:text-white gap-x-2">
            <span className="transition-all duration-300 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span>All Microsoft</span>
          </li>

          <li className="flex items-center text-xl font-black duration-300 cursor-pointer group text-primary hover:text-white gap-x-2">
            <span className="transition-all duration-300 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className="flex flex-row-reverse items-center gap-x-1">
              Search <BiSearch />
            </span>
          </li>

          <li className="flex items-center text-xl font-black duration-300 cursor-pointer group text-primary hover:text-white gap-x-2">
            <span className="transition-all duration-300 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className="flex flex-row-reverse items-center gap-x-1">
              Cart <BiCart />
            </span>
          </li>

          <li className="flex items-center text-xl font-black duration-300 cursor-pointer group text-primary hover:text-white gap-x-2">
            <span className="transition-all duration-300 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className="flex flex-row-reverse items-center gap-x-1">
              Account <BiUser />
            </span>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
