import HeroSection from "@components/page-sections/home/hero-section";
import Description from "@components/page-sections/home/description";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";

const page = () => {
  return (
    <section >
      <Navbar
        buttonText="Login"
        buttonLink="/login"
        showBackground={true}
        linkColor="white"
        buttonTextColor="white"
      />
      <HeroSection />
      <div className="container mx-auto max-w-screen-2xl">
        <Description />
      </div>
      <Footer />
    </section>
  )
}

export default page
