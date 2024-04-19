import Link from "next/link";

const Button = ({ text, bg, textColor, link, border }) => {
  let backgroundColorClass;
  let textColorClass;

  if (bg === "accent") {
    backgroundColorClass = "bg-[var(--accent-color)]";
  } else if (bg === "green") {
    backgroundColorClass = "bg-[var(--money-green)]";
  } else {
    backgroundColorClass = "bg-[var(--primary-color)]";
  }

  textColorClass = textColor ? "text-[var(--dark-color)]" : "text-white";
  const buttonStyle = `h-fit cursor-pointer text-center px-4 py-0.5 border-solid rounded-md border-2 ${
    textColor === "blue"
      ? "text-[var(--primary-color)] border-[var(--primary-color)]"
      : "text-white border-white"
  }`;

  if (border) {
    return (
      <Link className={buttonStyle} href={link}>
        {text}
      </Link>
    );
  }

  return (
    <Link
      className={`h-fit button-big rounded-md p-2 text-center align-center w-36 ${backgroundColorClass} ${textColorClass}`}
      href={link}
    >
      {text}
    </Link>
  );
};

export default Button;
