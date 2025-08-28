import Container from "@components/layout/Container";
import CareerFirstImage from "@/assets/images/Career1.png";
import CareerSecondImage from "@/assets/images/Career2.png";
import CareerCard from "./ui/CareerCard";

export default function CareerSection() {
    return (
        <section className="pt-[60px] xl:pt-[140px] 3xl:pt-[190px]">
            <Container>
                <h2 className="text-left md:text-center text-[24px] xl:text-4xl 3xl:text-6xl  font-semibold text-black">
                    Career Journeys Powered by NextHire
                </h2>
                <div className="flex flex-col xl:flex-row gap-y-12 items-center gap-x-[70px] mt-[80px]">
                    <CareerCard
                        variant="primary"
                        icon={CareerFirstImage}
                        text="Lily Anderson"
                        subText="Digital Marketing Specialist"
                        description="“NextHire helped me find the right opportunities fast, showcase my skills, and land a marketing role I’m excited about.”"
                    />
                    <CareerCard
                        variant="secondary"
                        icon={CareerSecondImage}
                        text="Noah Wilson"
                        subText="Backend Developer"
                        description="“With NextHire, I quickly matched with companies that valued my coding skills and landed a role where I can grow as a developer.”"
                    />
                </div>
            </Container>
        </section>
    );
}
