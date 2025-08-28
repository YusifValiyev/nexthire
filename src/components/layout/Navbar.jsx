"use client";

import { useEffect, useState } from "react";
import Container from "@components/layout/Container";
import Logo from "@public/Logo.svg";
import Menu from "@/assets/icons/Menu.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // change after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-[20px] md:py-[50px] transition-colors duration-300
      ${scrolled ? "bg-[url('@/assets/images/Rectangle.png')] bg-cover bg-center" : "bg-transparent"}`}
    >
      <Container className="flex items-center justify-between text-white">
        <img
          src={Logo}
          alt="NextHire Logo"
          className="w-[67px] md:w-[151px] h-[52px]"
        />
        <ul className="hidden md:flex gap-x-[72px] text-sm">
          <li>About us</li>
          <li>Features</li>
          <li>Contact</li>
        </ul>
        <div className="flex items-center gap-x-6">
          <button className="bg-transparent border-0 text-white text-sm">
            Sign up
          </button>
          <button className="block md:hidden">
            <img src={Menu} alt="Menu" />
          </button>
        </div>
      </Container>
    </nav>
  );
}
