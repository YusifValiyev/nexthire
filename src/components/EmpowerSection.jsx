import Container from "@components/layout/Container";
import GraduateIcon from "@/assets/icons/Graduate.svg";
import RecruiterIcon from "@/assets/icons/Recruiter.svg";
import CourseIcon from "@/assets/icons/Course.svg";
import EmpowerCard from "./ui/EmpowerCard";

export default function EmpowerSection() {
    return (
        <section className="pt-[60px] xl:pt-[140px] 3xl:pt-[190px]">
            <Container>
                <h2 className="text-left md:text-center text-base xl:text-4xl 3xl:text-6xl font-semibold text-black">
                    Who We Empower
                </h2>
                <div className="flex flex-col md:flex-row flex-wrap 2xl:flex-nowrap justify-center  items-center gap-x-[70px] mt-8 md:mt-[80px] gap-y-4">
                    <EmpowerCard
                        variant="secondary"
                        icon={GraduateIcon}
                        text="Students & Graduates"
                        subText="Track your growth, showcase real skills, land better jobs."
                    />
                    <EmpowerCard
                        variant="secondary"
                        icon={RecruiterIcon}
                        text="Recruiters & HR"
                        subText="Hire faster, smarter, and based on true potential."
                    />
                    <EmpowerCard
                        variant="secondary"
                        icon={CourseIcon}
                        text="Additional Courses"
                        subText="Measure learning, highlight achievements, drive careers."
                    />
                </div>
            </Container>
        </section>
    );
}
