import Container from "@components/layout/Container";

const linearGradient = "bg-gradient-to-r from-[#3800A9] to-[#160043]";
export default function HiringSection() {
    const renderList = (textList) => {
        return textList.map((text, index) => (
            <div
                className={`p-[24px_24px_24px_32px] md:p-[30px_30px_30px_59px] w-[100%] text-white rounded-[16px] md:rounded-[28px] text-[16px] lg:text-sm 3xl:text-lg ${linearGradient}`}
            >
                {text}
            </div>
        ));
    };

    return (
        <section className="pt-[60px] xl:pt-[140px] 3xl:pt-[190px]">
            <Container className="flex flex-col lg:flex-row justify-between gap-y-8 items-center">
                <div className="flex flex-col justify-between gap-y-4 md:gap-y-8 w-full md:w-[70ch]">
                    <h2 className="text-base w-[227px] md:w-full xl:text-4xl 3xl:text-6xl font-medium leading-normal md:leading-16">
                        Reimagining Talent Rethinking Hiring
                    </h2>
                    <p className="text-text text-[16px] xl:text-base 3xl:text-big-lg">
                        We don’t just test skills—we reveal potential.
                    </p>
                </div>
                <div className="flex flex-col gap-y-6 w-full lg:w-1/2">
                    {renderList([
                        "AI-Powered Assessments",
                        "Real-Time Feedback & Growth Tracker",
                        "Smart Job Matching",
                        "Soft + Technical Skill Evaluation",
                    ])}
                </div>
            </Container>
        </section>
    );
}
