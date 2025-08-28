import Logo from "@public/Logo.svg";
import Button from "@components/ui/Button";
import Instagram from "@/assets/icons/svg-instagram.svg";
import Facebook from "@/assets/icons/svg-fb.svg";
import Whatsapp from "@/assets/icons/svg-wp.svg";
import LinkedIn from "@/assets/icons/svg-ln.svg";

export default function Footer() {
    return (
        <footer className="mt-[60px] md:mt-[190px] py-[71px] md:py-[117px] px-8 md:px-[104px] mx-2 md:mx-[35px] rounded-4xl bg-[url(@/assets/images/Rectangle.png)] bg-no-repeat bg-cover">
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <img src={Logo} className="w-[150px]" alt="Logo" />
                    <p className="mt-[32px] text-[#C3C3C3]">
                        Where Talent Meets Opportunity
                    </p>
                    <div className="border rounded-3xl border-[#ABABAB] mt-[40px] w-[345px] md:w-[509px] relative">
                        <input
                            type="text"
                            placeholder="support@nexthire.az"
                            className="w-full py-[14px] pl-[20px] text-[16px] text-[#ABABAB] pr-[150px] outline-none rounded-3xl"
                        />
                        <Button
                            text="Subscribe"
                            className="absolute right-0 top-1/2 -translate-y-1/2 py-[14px] px-[29px] text-[16px] rounded-3xl"
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-start md:justify-between lg:items-end w-full mt-[50px] md:mt-[158px] gap-y-[46px]">
                    <div class="flex flex-col justify-between lg:justify-start md:flex-row w-full lg:gap-x-[50px] xl:gap-x-[110px] 2xl:gap-x-[170px] gap-y-[46px]">
                        <ul className="flex flex-col gap-y-[24px]">
                            <h4 className="text-white font-semibold text-[24px]">
                                Quick Links
                            </h4>
                            <li className="text-[#A3A3A3] text-[24px]">
                                <a href="#">Home</a>
                            </li>
                            <li className="text-[#A3A3A3] text-[24px]">
                                <a href="#">Features</a>
                            </li>
                            <li className="text-[#A3A3A3] text-[24px]">
                                <a href="#">Pricing</a>
                            </li>
                            <li className="text-[#A3A3A3] text-[24px]">
                                <a href="#">Contact</a>
                            </li>
                        </ul>

                        <ul className="flex flex-col gap-y-[24px]">
                            <h4 className="text-white font-semibold text-[20px] lg:text-[24px]">
                                Explore NextHire
                            </h4>
                            <li className="text-[#A3A3A3] text-[20px] lg:text-[24px]">
                                <a href="#">Home</a>
                            </li>
                            <li className="text-[#A3A3A3] text-[20px] lg:text-[24px]">
                                <a href="#">Features</a>
                            </li>
                            <li className="text-[#A3A3A3] text-[20px] lg:text-[24px]">
                                <a href="#">Plans</a>
                            </li>
                            <li className="text-[#A3A3A3] text-[20px] lg:text-[24px]">
                                <a href="#">Careers</a>
                            </li>
                        </ul>

                        <ul className="flex flex-col gap-y-[24px]">
                            <h4 className="text-white font-semibold text-[20px] lg:text-[24px]">
                                Support
                            </h4>
                            <li className="text-[#A3A3A3] text-[20px] lg:text-[24px]">
                                <a href="#">Help Center</a>
                            </li>
                            <li className="text-[#A3A3A3] text-[20px] lg:text-[24px]">
                                <a href="#">Contact Support</a>
                            </li>
                            <li className="text-[#A3A3A3] text-[20px] lg:text-[24px]">
                                <a href="#">Community</a>
                            </li>
                            <li className="text-[#A3A3A3] text-[20px] lg:text-[24px]">
                                <a href="#">Updates</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-y-8">
                        <p className="text-white font-semibold text-[20px] lg:text-[24px]">
                            Contact
                        </p>
                        <div className="flex gap-x-[32px]">
                            <img src={Instagram} alt="Instagram" />
                            <img src={Facebook} alt="Facebook" />
                            <img src={Whatsapp} alt="WhatsApp" />
                            <img src={LinkedIn} alt="LinkedIn" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
