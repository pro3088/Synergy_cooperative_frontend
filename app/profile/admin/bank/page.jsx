import Banks from "@/components/page-sections/profile/admin/Banks";
import Button from "@components/common/OverlayButton";
import BankOverlay from "@components/page-sections/profile/admin/BankOverlay"

const formConfig = [
    { name: "name", label: "Bank Name" },
    { name: "accountName", label: "Account Name" },
    { name: "accountNumber", label: "Account Number" },
    
  ];

const page = () => {
    return (
        <div className="w-3/4 pr-12 pt-12 left-0">
          <div className="flex flex-col w-full h-full space-y-4">
            <div className="flex flex-col space-y-2">
              <h3 className="font-bold text-2xl">Banks</h3>
              <h5>All banks info</h5>
            </div>
            <Button
            text="Add Bank"
            bg="green"
            overlayContent={
              <BankOverlay formConfig={formConfig} />
            }
          />
            <Banks />
          </div>
        </div>
    );
}

export default page
