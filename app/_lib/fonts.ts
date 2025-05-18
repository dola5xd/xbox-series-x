import localFont from "next/font/local";

export const segoePro = localFont({
  src: [
    {
      path: "../_assets/fonts/SegoePro-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../_assets/fonts/SegoePro-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../_assets/fonts/SegoePro-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../_assets/fonts/SegoePro-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
});
