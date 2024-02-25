import Investment from "@components/page-sections/profile/investor/Investments";
import Button from "@components/common/OverlayButton";
import ApplicationOverlay from "@components/page-sections/profile/loanee/ApplicationOverlay";

const page = () => {
  return (
    <div className="w-3/4 pr-12 pt-12 left-0">
      <div className="flex flex-col w-full h-full space-y-4">
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-4xl">Investments</h3>
          <h5>View your investments</h5>
        </div>
        <div className="flex w-full justify-between">
          <Button text="Invest" bg="green" overlayContent={<ApplicationOverlay type="INVESTMENT" period={false} />} />
          <Button text="Withdraw" overlayContent={<ApplicationOverlay type="WITHDRAW" period={false}/>} />
        </div>
        <Investment />
      </div>
    </div>
  );
};

export default page;
