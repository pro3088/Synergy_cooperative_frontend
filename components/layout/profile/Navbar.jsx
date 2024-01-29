"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ items }) => {
  const pathname = usePathname();

  return (
      <div className="pt-12 h-[95vh] bg-[var(--plain-color)] w-1/4 flex flex-col items-center">
        {items.map((item, index) => (
          <Link key={index} href={item.link} className="w-full">
            <button
              className={`font-bold w-full py-8 text-center transition duration-300 ${
                pathname === item.link
                  ? "bg-gray-50 text-[var(--primary-color)]"
                  : "hover:bg-gray-300"
              }`}
            >
              {item.name}
            </button>
          </Link>
        ))}
      </div>
  );
};

export default Navbar;
