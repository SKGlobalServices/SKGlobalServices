import { NavBar } from "../../sections/NavBar/Navbar";
import { Services } from "../../sections/Services/Services";
import { Contact } from "../../sections/Contact/Contact";
import { Footer } from "../../sections/Footer/Footer";
import { ScrollDownPrompt } from "../../components/iu/ScrollDownPrompt/ScrollDownPrompt";
import { Whatsappbutton } from "../../components/iu/Whatsappbutton/Whatsappbutton";
import bannervideo from "../../assets/img/banner-videoR.mp4";
import { useTranslation } from "react-i18next";


export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="navbar-with-video">
        <video className="video-background" autoPlay muted loop>
          <source src={bannervideo} type="video/mp4" />
          {t("navbar.video_fallback")}
        </video>
        <ScrollDownPrompt />
        <NavBar />
      </div>
      <Whatsappbutton />
      <Services />
      <Contact />
      <Footer />
    </>
  );
};
