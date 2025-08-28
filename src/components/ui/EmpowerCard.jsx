export default function EmpowerCard({ variant, icon, text, subText }) {
    const linearGradient = "bg-gradient-to-b from-[#3800A9] to-[#160043]";
    const variantClasses = {
        primary: "text-white" + " " + linearGradient,
        secondary: "text-black bg-bg-gray",
    };
    return (
        <div
            className={`min-w-[200px] max-w-[345px] min-h-[345px] md:min-w-[400px] md:max-w-[500px] md:min-h-[500px]  p-[40px] md:p-[76px] rounded-[40px] md:rounded-[86px] ${
                variantClasses[variant] ?? variantClasses.primary
            }`}
        >
            <div className="flex flex-col items-start h-full">
                <img src={icon} alt="skill_image" className="w-[75px] md:w-[95px]" />
                <p className="text-base md:text-2xl mt-[41px]">{text}</p>
                {subText && <p className="text-[16px] md:text-base text-text mt-[24px]">{subText}</p>}
            </div>
        </div>
    );
}
