import Container from "@components/layout/Container";
import SkillCard from "./ui/SkillCard";
import GroupIcon from "@/assets/icons/Group.svg";
import JobIcon from "@/assets/icons/Job.svg";
import GraphIcon from "@/assets/icons/Graph.svg";

export default function SkillSection() {
    return (
        <section className="pt-[60px] xl:pt-[140px] 3xl:pt-[190px]">
            <Container>
                <h2 className="w-full md:max-w-[773px] text-[24px] md:text-2xl xl:text-4xl 3xl:text-6xl font-semibold text-black">
                    Turning Your Skills into Career Moves
                </h2>
                <div
                    className="flex flex-wrap xl:flex-nowrap justify-center flex-col md:flex-row items-center
                    gap-x-[30px] xl:gap-x-[40px] 3xl:gap-x-[70px] gap-y-4 mt-8 md:mt-[80px]"
                >
                    <SkillCard
                        variant="primary"
                        icon={GroupIcon}
                        text="Take Skill-Based Assessments"
                    />
                    <SkillCard
                        variant="secondary"
                        icon={GraphIcon}
                        text="Build Your Skill Map for Success"
                    />
                    <SkillCard
                        variant="secondary"
                        icon={JobIcon}
                        text="Connect with the Right Career"
                    />
                </div>
            </Container>
        </section>
    );
}
