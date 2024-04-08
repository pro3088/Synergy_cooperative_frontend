import NotificationIcon from "@components/page-sections/profile/NotificationIcon";
import ProfileIcon from "@components/page-sections/profile/profileIcon";
import Link from "next/link";

const Panel = ({ isMobileView }) => {
  return (
    <div className="flex w-full ">
      {isMobileView && (
        <Link href={"/"} className="font-bold flex items-center ml-auto ml-0 text-center">
          {" "}
          Synergy Cooperative LTD{" "}
        </Link>
      )}
      <div className="flex space-x-4 ml-auto mr-0 items-center">
        <NotificationIcon />
        <ProfileIcon />
      </div>
    </div>
  );
};

export default Panel;
