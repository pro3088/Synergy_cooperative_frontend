"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ items, isMobileView=false }) => {
  const pathname = usePathname();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const status = localStorage.getItem("STATUS");
    if (status == "ADMIN"){
      setUrl("/profile/admin");
    }
    else if (status == "FINANCIAL_MEMBER"){
      setUrl("/profile/financial_member");
    }
    else{
      setUrl("/profile/member");
    }
  }, []);

  return (
    <section className=" w-full md:w-1/4">
      {isMobileView ? (
        <div className="overflow-x-auto whitespace-nowrap w-full">
          <div className="flex flex-row space-x-4 items-center justify-center">
            {items.map((item, index) => (
              <Link key={index} href={item.link} className="">
                <button
                  className={`font-bold p-2 rounded-md transition duration-300 ${
                    pathname === item.link
                      ? "bg-gray-100 text-[var(--primary-color)]"
                      : "hover:bg-gray-300"
                  }`}
                >
                  <span className="text-base w-32">{item.name}</span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-[var(--plain-color)] flex flex-col items-center">
          <Link href={url} className="font-bold w-full py-8 text-center">
            {" "}
            Synergy Cooperative LTD{" "}
          </Link>
          {items.map((item, index) => (
            <Link key={index} href={item.link} className="w-full">
              <button
                className={`font-bold w-full py-8 transition duration-300 ${
                  pathname === item.link
                    ? "bg-gray-50 text-[var(--primary-color)]"
                    : "hover:bg-gray-300"
                }`}
              >
                <div className="flex items-center justify-around px-4">
                  <img
                    src={item.image}
                    alt="image"
                  />
                  <span className="text-base w-32">{item.name}</span>
                </div>
              </button>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Navbar;
