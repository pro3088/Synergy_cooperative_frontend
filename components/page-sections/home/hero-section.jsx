import Button from "@components/common/Button";

function HeroSection() {
  return (
    <div className="bg-cover bg-center h-[70vh] w-full text-white relative flex items-center"
        style={{
          backgroundImage: 'url("/heroImage.jpg")',
          backgroundColor: "var(--dark-color)",
          backgroundBlendMode: "overlay",
          opacity: 0.9,
          backgroundSize: "cover"
        }}
      >
      <div className="flex flex-col gap-4 container mx-auto max-w-screen-2xl px-4 md:px-12 lg:px-28">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">
            Apply for your loan
          </h1>
          <h3 className="text-lg">
            Apply with trust and confidence
          </h3>
        </div>
        
        <Button text="Get Started" bg="accent" textColor={true} link="signup"/>
      </div>
    </div>
  );
}

export default HeroSection;
