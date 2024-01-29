const Description = () => {
    const steps = [
      {
        number: 1,
        title: "Get a Referral",
        description: "Get started in seconds! Fill out our easy form for quick financial assistance tailored to your needs.",
      },
      {
        number: 2,
        title: "Create an Account with a Referral",
        description: "Connect for Customized Solutions: Find Your Ideal Financial Match with Our Trusted Partners.",
      },
      {
        number: 3,
        title: "Fill and Submit your Form to your Referral",
        description: "Find Your Ideal Loan: Tailored for Your Needs, Powering Your Dreams.",
      },
      {
        number: 4,
        title: "Enjoy your money",
        description: "Find Your Ideal Loan: Tailored for Your Needs, Powering Your Dreams.",
      },
    ];
  
    return (
      <div className="flex flex-col-reverse gap-16 md:flex-row md:gap-2 items-center justify-around mt-16 px-4 md:px-12 lg:px-28">
        <div className="flex flex-col md:w-2/4">
          <h4>How it works</h4>
          <div className="flex flex-col gap-8 mt-2">
            {steps.map((step) => (
              <div key={step.number} className="flex ">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
                  {step.number}
                </div>
                <div className="max-w-[15rem] lg:max-w-md">
                  <p className="font-bold">{step.title}</p>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
        </div>
        </div>
        <div className="md:w-2/4 h-auto">
            <img
            src="/coins.svg"
            alt="Coins Image"
            />
        </div>
      </div>
    );
  };
  
  export default Description;
  