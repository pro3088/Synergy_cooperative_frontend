import NotificationIcon from "@components/page-sections/profile/NotificationIcon";
import ProfileIcon from "@components/page-sections/profile/profileIcon";

const Panel = () => {
  return (
    <div className="flex space-x-4 ml-auto mr-0 items-center">
      <NotificationIcon />
      <ProfileIcon />
    </div>
  );
};

export default Panel;
