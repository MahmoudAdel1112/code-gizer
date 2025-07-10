import React from "react";
import eldaroda from "@/public/Eldorado Gold Logo Horizontal_digital 1_0.png";
import ipsen from "@/public/Latest_Ipsen-logo_168x48.svg";
import zetta from "@/public/Zetta_logo.svg.png";

import beeline from "@/public/beeline-logo-full-white-text.svg";

import Image from "next/image";
import { motion } from "framer-motion";

const CompanyLogoData: Array<{ src: string; alt: string }> = [
  { src: eldaroda, alt: "eldaroda Logo" },
  { src: ipsen, alt: "ipsen Logo" },
  { src: zetta, alt: "zetta Logo" },

  { src: beeline, alt: "beeline Logo" },
];
const InfiniteScrollingLogosAnimation = () => {
  return (
    <div className="mt-20 container p-5">
      <div className="flex flex-wrap relative justify-center ">
        <motion.div
          //make the timing fast
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex w-full flex-wrap justify-center align-center gap-16 pr-16"
        >
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            CompanyLogoData.map((companyLogo: any, index: number) => (
              <Image
                key={index}
                src={companyLogo.src}
                alt={companyLogo.alt}
                className="h-10 w-auto object-contain "
              />
            ))
          }
        </motion.div>
      </div>
    </div>
  );
};
export default InfiniteScrollingLogosAnimation;
