export default function SkillCard({ variant, icon, text }) {
    const linearGradient = "bg-gradient-to-b from-[#3800A9] to-[#160043]";
    const variantClasses = {
        primary: "text-white" + " " + linearGradient,
        secondary: "text-secondary bg-bg-gray",
    };
    return (
        <div
            className={`
            max-w-[345px] xs:max-w-[360px] sm:max-w-[390px] lg:max-w-[430px] xl:max-w-[465px] 2xl:max-w-[485px] md:max-w-[500px]
            h-[345px] xs:h-[360px] sm:h-[390px] lg:h-[430px] xl:h-[465px] 2xl:h-[485px] md:h-[500px]
            p-[50px] xs:p-[53px] sm:p-[58px] lg:p-[65px] xl:p-[70px] 2xl:p-[73px] md:p-[76px]
            rounded-[40px] xs:rounded-[45px] sm:rounded-[52px] lg:rounded-[62px] xl:rounded-[72px] 2xl:rounded-[79px] md:rounded-[86px]
            ${variantClasses[variant] ?? variantClasses.primary}
            `}
        >
            <div className="flex flex-col items-start justify-between h-full">
                <img
                    src={icon}
                    alt="skill_image"
                    className="w-[75px] xs:w-[78px] sm:w-[82px] lg:w-[87px] xl:w-[91px] 2xl:w-[93px] md:w-[95px]
                    transition-all duration-300 hover:rotate-12 hover:scale-110"
                />
                <p className="text-base xs:text-lg sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl md:text-2xl
                font-medium leading-tight transition-all duration-300">
                    {text}
                </p>
            </div>
        </div>
    );
}
