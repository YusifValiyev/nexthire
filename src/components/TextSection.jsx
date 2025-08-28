export default function TextSection() {
    return (
        <section className="pt-[60px] mt-[60px] xl:mt-[140px] 3xl:mt-[190px] py-[77px] md:py-[208px] mx-[8px] md:mx-[35px] rounded-4xl bg-[url(@/assets/images/Rectangle.png)] bg-no-repeat bg-cover">
            <div className="flex items-center justify-center">
                <h2 className="text-lg xl:text-5xl 3xl:text-7xl max-w-[295px] md:max-w-[1221px] text-center text-white leading-normal md:leading-20">
                    With NextHire,{" "}
                    <span className="text-primary">
                        we connected students to the right opportunities
                    </span>{" "}
                    faster than ever, thanks to its{" "}
                    <span className="text-primary">intuitive and effortless</span>
                    career-matching platform. 
                </h2>
            </div>
        </section>
    );
}
