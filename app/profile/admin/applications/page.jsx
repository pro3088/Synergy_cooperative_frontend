import Applications from "@components/page-sections/profile/admin/Applications";
import Button from "@components/common/OverlayButton";
import ApplicationOverlay from "@components/page-sections/profile/loanee/ApplicationOverlay";

const page = () => {
  return (
    <div className="w-full pr-12 pt-12 left-0">
      <div className="flex flex-col w-full h-full space-y-4">
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-2xl">Applications</h3>
          <h5>Review applications here</h5>
        </div>
        <div className="flex w-full justify-between">
          <Button
            text="Invest"
            bg="green"
            overlayContent={
              <ApplicationOverlay type="INVESTMENT" period={false} />
            }
          />
          <Button
            text="Withdraw"
            overlayContent={
              <ApplicationOverlay type="WITHDRAW" period={false} />
            }
          />
        </div>
        <Applications />
      </div>
    </div>
  );
};

export default page;
