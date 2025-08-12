import HeroVideo from "@/components/iu/HeroVideo/HeroVideo";
import ScrollDownPrompt from "@/components/iu/ScrollDownPrompt/ScrollDownPrompt";
import Services from "@/sections/Services/Services";
import Contact from "@/sections/Contact/Contact";

export default function HomePage() {
  return (
    <>
      <HeroVideo>
        <ScrollDownPrompt />
      </HeroVideo>
      <Services />
      <Contact />
    </>
  );
}
