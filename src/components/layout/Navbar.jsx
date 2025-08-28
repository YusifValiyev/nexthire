import { useEffect, useState } from "react";
import Container from "@components/layout/Container";
import Logo from "@public/Logo.svg";
import Menu from "@/assets/icons/Menu.svg";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50); // change after 50px scroll
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isSidebarOpen]);

    return (
        <>
            {/* Navbar */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 py-[20px] lg:py-[25px] 2xl:py-[30px] 3xl:py-[50px] transition-colors duration-300
                ${
                    scrolled
                        ? "bg-[url('@/assets/images/Rectangle.png')] bg-cover bg-center"
                        : "bg-transparent"
                }`}
            >
                <Container className="flex items-center justify-between text-white">
                    <img
                        src={Logo}
                        alt="NextHire Logo"
                        className="w-[67px] xl:w-[100px] 3xl:w-[151px] h-[52px]"
                    />
                    <ul className="hidden md:flex gap-x-[72px] xl:text-[16px] 3xl:text-sm">
                        <li className="cursor-pointer">About us</li>
                        <li className="cursor-pointer">Features</li>
                        <li className="cursor-pointer">Contact</li>
                    </ul>
                    <div className="flex items-center gap-x-6">
                        <button className="bg-transparent border-0 text-white xl:text-[16px] 3xl:text-sm">
                            Sign up
                        </button>
                        <button
                            className="block md:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <img src={Menu} alt="Menu" />
                        </button>
                    </div>
                </Container>
            </nav>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 w-full h-full z-50 transform transition-transform duration-300
                ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
                bg-[url('@/assets/images/Rectangle.png')] bg-cover bg-center
                text-white flex flex-col`}
            >
                {/* Header with logo and close */}
                <div className="flex justify-between items-center p-6">
                    <img
                        src={Logo}
                        alt="NextHire Logo"
                        className="w-[67px] xl:w-[100px] h-[52px]"
                    />
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Menu items */}
                <ul className="flex flex-col items-center justify-center gap-y-8 text-lg flex-1">
                    <li
                        className="cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        About us
                    </li>
                    <li
                        className="cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        Features
                    </li>
                    <li
                        className="cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        Contact
                    </li>
                </ul>
            </div>
        </>
    );
}
