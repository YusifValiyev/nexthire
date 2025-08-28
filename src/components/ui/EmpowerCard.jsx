export default function EmpowerCard({ variant, icon, text, subText }) {
    const linearGradient = "bg-gradient-to-b from-[#3800A9] to-[#160043]";
    const variantClasses = {
        primary: "text-white" + " " + linearGradient,
        secondary: "text-black bg-bg-gray",
    };
    return (
        <div
            className={`min-w-[200px] max-w-[345px] min-h-[345px] xl:min-w-[345px] xl:max-w-[380px] xl:min-h-[380px] 3xl:max-w-[500px] 3xl:min-h-[500px]  p-[40px] xl:p-[55px] 3xl:p-[76px] rounded-[40px] md:rounded-[86px] ${
                variantClasses[variant] ?? variantClasses.primary
            }`}
        >
            <div className="flex flex-col items-start h-full">
                <img src={icon} alt="skill_image" className="w-[75px] xl:w-[80px] 3xl:w-[95px]" />
                <p className="text-base xl:text-base 3xl:text-2xl mt-[41px]">{text}</p>
                {subText && <p className="text-[16px] xl:text-sm 3xl:text-base text-text mt-[24px]">{subText}</p>}
            </div>
        </div>
    );
}
