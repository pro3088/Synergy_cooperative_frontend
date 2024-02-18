import Button from "@components/common/Button";
import NotificationIcon from "@components/page-sections/profile/NotificationIcon";
import ProfileIcon from "@components/page-sections/profile/profileIcon";

const Navbar = ({
  buttonText,
  buttonLink,
  showBackground,
  plainBackground,
  linkColor,
  buttonTextColor,
}) => {
  const navbarClasses = `h-[5vh] flex items-center w-full ${
    showBackground ? "bg-[var(--primary-color)]" : ""
  } ${plainBackground ? "bg-[var(--plain-color)]" : ""} py-8 px-2 md:px-12 lg:px-28`;

  const linkStyle = `flex-no-grow flex-no-shrink relative ${
    linkColor === "black" ? "text-[var(--dark-color)]" : "text-white"
  } no-underline flex items-center hover:bg-grey-dark font-bold`;

  return (
    <div className={navbarClasses}>
      <div className="container mx-auto max-w-screen-2xl ">
        <div className="flex flex-no-shrink items-center justify-between">
          <a href="/" className={linkStyle}>
            Synergy Cooperative LTD
          </a>
          <Button
            text={buttonText}
            textColor={buttonTextColor}
            link={buttonLink}
            border={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
