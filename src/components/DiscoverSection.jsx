import Button from "@components/ui/Button";
import Container from "@components/layout/Container";

export default function DiscoverSection() {
    return (
        <section className="discover-section min-h-[80%] md:min-h-[100vh] bg-[url(@/assets/images/Rectangle.png)] bg-no-repeat bg-cover pt-[152px] pb-[100px] md:pb-[100px] flex items-center justify-center">
            <Container>
                <div className="flex flex-col items-center gap-y-[32px] md:gap-y-[72px]">
                    <div className="flex flex-col items-center gap-y-4 md:gap-y-[42px]">
                        <h2 className="text-white text-lg md:text-4xl xl:text-6xl 3xl:text-max-large max-w-full md:max-w-[70%] text-center font-semibold">
                            Go Beyond Grades Discover Real Talent
                        </h2>
                        <h4 className="text-[#ECECEC] text-[16px] md:text-base xl:text-big-lg  3xl:text-3xl font-normal">
                            Assessing skills, unlocking opportunities
                        </h4>
                    </div>
                    <div className="flex gap-x-3 md:gap-x-5">
                        <Button
                            variant="contained"
                            text="Get started"
                            type="button"
                        />
                        <Button
                            variant="outlined"
                            text="How it works"
                            type="button"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
