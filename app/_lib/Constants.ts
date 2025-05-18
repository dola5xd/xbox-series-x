export type XboxVersionsType = {
  color: string;
  description:
    | "1TB Disc Drive Carbon Black"
    | "1TB All-Digital Robot White"
    | "2TB Disc Drive Galaxy Black";
  price: number;
  images: string[];
};

export type FeatureType = {
  head: string;
  description: string;
  img: string;
};

export type GamesType = {
  name: string;
  img: string;
  link: string;
};

export type VersionBanner = {
  color: string;
  description:
    | "1TB Disc Drive Carbon Black"
    | "1TB All-Digital Robot White"
    | "2TB Disc Drive Galaxy Black";
  img: string;
  pattern?: string;
};

export const navList = [
  "Game Pass",
  "Games",
  "Devices",
  "Play",
  "Store",
  "Communnity",
  "Support",
  "More",
];

export const xboxVersions: XboxVersionsType[] = [
  {
    color: "Black",
    description: "1TB Disc Drive Carbon Black",
    price: 499.99,
    images: [
      "/assets/images/Xbox_black_1.webp",
      "/assets/images/Xbox_black_2.webp",
      "/assets/images/Xbox_black_3.webp",
      "/assets/images/Xbox_black_4.webp",
    ],
  },
  {
    color: "White",
    description: "1TB All-Digital Robot White",
    price: 499.99,
    images: [
      "/assets/images/Xbox_white_1.webp",
      "/assets/images/Xbox_white_2.webp",
      "/assets/images/Xbox_white_3.webp",
      "/assets/images/Xbox_white_4.webp",
    ],
  },
  {
    color: "Galaxy",
    description: "2TB Disc Drive Galaxy Black",
    price: 599.99,
    images: [
      "/assets/images/Xbox_galaxy_1.webp",
      "/assets/images/Xbox_galaxy_2.webp",
      "/assets/images/Xbox_galaxy_3.webp",
      "/assets/images/Xbox_galaxy_4.webp",
    ],
  },
];

export const informations = [
  {
    head: "Performance",
    text: "Custom AMD Zen 2 8-core CPU (3.8 GHz, 3.6 GHz w/ SMT) paired with a 12-TFLOP RDNA 2 GPU (52 CUs @ 1.825 GHz) and 16 GB GDDR6 RAM for native 4K/60 FPS (up to 120 FPS) gaming and hardware-accelerated ray tracing.",
    mobileImg: "/assets/images/Xbox_black_2.webp",
  },
  {
    head: "Storage & Memory",
    text: "1 TB custom NVMe SSD (2.4 GB/s raw, 4.8 GB/s compressed) + proprietary 1 TB expansion card slot, backed by 16 GB GDDR6 (10 GB @ 560 GB/s + 6 GB @ 336 GB/s) to minimize load times and support Quick Resume.",
    mobileImg: "/assets/images/Xbox_black_1.webp",
  },
  {
    head: "Features & Compatibility",
    text: "Supports 720p–8K output via HDMI 2.1 (VRR, ALLM), backward-compatible with Xbox One/360/OG titles, plus Auto HDR, Smart Delivery, and Quick Resume for seamless cross-gen play.",
    mobileImg: "/assets/images/Xbox_black_3.webp",
  },
];

export const features: FeatureType[] = [
  {
    head: "QUICK RESUME",
    img: "/assets/images/Quick-Resume.webp",
    description:
      "Seamlessly switch between different titles and instantly resume from where you left off.",
  },
  {
    head: "FASTER LOAD TIMES",
    img: "/assets/images/Faster-Load.webp",
    description:
      "Games load significantly faster with the custom SSD and integrated software. While ultra-low latency improves the response time from your controller to your TV.",
  },
  {
    head: "NEXT-GEN FRAMERATE",
    img: "/assets/images/NextGen.webp",
    description: "Higher, steadier framerates at up to 120FPS while playing.",
  },
];

export const gamesData: GamesType[] = [
  {
    name: "Nba 2k25",
    img: "/assets/images/NBA 2k25.webp",
    link: "https://www.xbox.com/games/nba-2k25",
  },
  {
    name: "call of duty black ops 6",
    img: "/assets/images/Call Of Duty BO6.webp",
    link: "https://www.xbox.com/games/call-of-duty-black-ops-6",
  },
  {
    name: "diablo iv",
    img: "/assets/images/Diablo IV.webp",
    link: "https://www.xbox.com/games/diablo-iv",
  },
  {
    name: "age of mythology retold",
    img: "/assets/images/Age of Mythology Retold.webp",
    link: "https://www.xbox.com/games/age-of-mythology-retold",
  },
  {
    name: "sea of thieves",
    img: "/assets/images/Sea Of Thievees.webp",
    link: "https://www.xbox.com/games/sea-of-thieves",
  },
  {
    name: "microsoft flight simulator",
    img: "/assets/images/Microsoft Flight Sim.webp",
    link: "https://www.xbox.com/games/microsoft-flight-simulator",
  },
  {
    name: "forza motorsport",
    img: "/assets/images/Forza Motorsport.webp",
    link: "https://www.xbox.com/games/forza-motorsport",
  },
];

export const experiences = [
  {
    title: "Optimized gaming experience",
    icon: "https://cms-assets.xboxservices.com/assets/fc/80/fc801b4c-fd95-4a10-8f03-da193e5792df.svg?n=Xbox-Series-X_Icons_768_Optimized_96x42_01.svg",
    description:
      "Games built with the Xbox Series X|S development kit showcase unparalleled load times, visuals, and responsiveness.",
  },
  {
    title: "Amazing visual fidelity",
    icon: "https://cms-assets.xboxservices.com/assets/5a/2f/5a2f7071-37e4-4aa0-8531-a6d70bbb0fc1.svg?n=Xbox-Series-X_Icons_768_Visual-Fidelity_100x73_01.svg",
    description:
      "Hardware-accelerated ray tracing gives your games a heightened level of realism.",
  },
  {
    title: "Get it once",
    icon: "https://cms-assets.xboxservices.com/assets/8b/73/8b733e42-5de3-4378-b63c-eb0c133fe08a.svg?n=Xbox-Series-X_Icons_768_Smart-Delivery_96x91_01.svg",
    description:
      "With Smart Delivery you can buy a supported game once and always save the best available version for whatever console you play on.",
  },
];

export const versions: VersionBanner[] = [
  {
    color: "Carbon Black",
    description: "1TB Disc Drive Carbon Black",
    img: "/assets/images/Xbox_black_banner.webp",
  },
  {
    color: "Robot White",
    description: "1TB All-Digital Robot White",
    img: "/assets/images/Xbox_white_banner.webp",
  },
  {
    color: "Galaxy Black",
    description: "2TB Disc Drive Galaxy Black",
    img: "/assets/images/Xbox_galaxy_banner.webp",
    pattern: "/assets/images/galaxy_pattern.webp",
  },
];

export const versionBox = [
  {
    name: "1TB Disc Drive Carbon Black",
    price: 599.99,
    includes: [
      "Xbox Series X – 1TB Carbon Black",
      "Xbox Wireless Controller – Carbon Black",
    ],
    link: "https://www.xbox.com/en-us/configure/8WJ714N3RBTL",
  },
  {
    name: "1TB All-Digital Robot White",
    price: 549.99,
    includes: [
      "Xbox Series X – 1TB Digital Edition (White)",
      "Xbox Wireless Controller – Robot White",
    ],
    link: "https://www.xbox.com/en-us/configure/8z1l85h2g116",
  },
  {
    name: "2TB Disc Drive Galaxy Black",
    price: 729.99,
    includes: [
      "Xbox Series X – 2TB Galaxy Black Special Edition",
      "Xbox Wireless Controller – Galaxy Black Special Edition",
    ],
    link: "https://www.xbox.com/en-us/configure/8smbrt7wmfp9",
  },
];

export const addonns = [
  {
    name: "Xbox Elite Wireless Controller Series 2",
    description:
      "Play like a pro with the unlimited customization of the Xbox Elite Wireless Controller Series 2.",
    link: "https://www.xbox.com/accessories/controllers/elite-wireless-controller-series-2",
    img: "/assets/images/Xbox_Elite_Controller.webp",
  },
  {
    name: "Storage Expansion Card for Xbox Series X|S",
    description:
      "Download more games with an additional 1TB of external memory while maintaining the same performance as the console’s internal SSD.",
    link: "https://www.xbox.com/accessories/hard-drives/seagate-1tb-expansion-card",
    img: "/assets/images/Expansion Card.webp",
  },
  {
    name: "Xbox Wireless Headset",
    description:
      "Hear ‘em coming. Never miss a beat with the Xbox Wireless Headset.",
    link: "https://www.xbox.com/accessories/headsets/xbox-wireless-headset",
    img: "/assets/images/Wireless Headset.webp",
  },
];
