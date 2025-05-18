import { ReactNode } from "react";
import { segoePro } from "../_lib/fonts";
import { IoIosArrowForward } from "react-icons/io";

function Button({
  children,
  variants = "primary",
  className,
}: {
  children: ReactNode;
  variants?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`${segoePro.className} py-2 ${
        variants === "primary"
          ? "bg-primary text-black"
          : "text-primary bg-transparent"
      } font-black rounded flex items-center uppercase gap-x-2 cursor-pointer justify-center duration-500 hover:underline hover:gap-x-6 px-4 ${className}`}
    >
      {children} <IoIosArrowForward size={25} />
    </button>
  );
}

export default Button;
