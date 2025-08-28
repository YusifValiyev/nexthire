export default function CareerCard({
    variant,
    icon,
    text,
    subText,
    description,
}) {
    const linearGradient = "bg-gradient-to-b from-[#3800A9] to-[#160043]";
    const variantClasses = {
        primary: "text-white" + " " + linearGradient,
        secondary: "text-black bg-bg-gray",
    };
    return (
        <div
            className={`w-full rounded-[40px] md:w-[786px] flex flex-col gap-y-[68px] justify-between h-full md:h-[478px] md:rounded-[80px] flex-[1_0_0] ${
                variantClasses[variant] ?? variantClasses.primary
            }`}
        >
            <div className="ml-[32px] md:ml-[60px] mt-[40px] md:mt-[60px] flex flex-col gap-y-2 ">
                <p className={`text-lg`}>{text}</p>
                <p
                    className={`text-[20px]${
                        variant === "primary"
                            ? "text-[#C3C3C3]"
                            : "text-[#3C3C3C]"
                    }`}
                >
                    {subText}
                </p>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-center gap-x-[12px] overflow-hidden rounded-[40px] md:rounded-[80px]">
                <img src={icon} alt="skill_image" className="self-start -ml-15 object-contain" />
                <p
                    className={`text-[16px] px-8 md:px-1 xl:text-[20px] 3xl:text-[22px] md:w-[348px]${
                        variant === "primary"
                            ? "text-[#C3C3C3]"
                            : "text-[#3C3C3C]"
                    }`}
                >
                    {description}
                </p>
            </div>
        </div>
    );
}
