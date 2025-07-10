import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import testImage from "@/public/aiGirl.jpg";
import Quotes from "./Quotes";

const Testimonials = () => {
  return (
    <div className=" px-5 bg-gray-950 pb-25 overflow-hidden">
      <h2 className=" text-base font-semibold text-primary relative inline-block mb-9">
        What Our Users Say
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary"
          style={{ width: "100%" }}
        ></motion.span>
      </h2>
      <div className="flex flex-col relative  justify-center items-center ">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="   "
        >
          <Image
            src={testImage}
            alt="Testimonial Image"
            className="h-[300px] w-[250px] object-cover  rounded-2xl"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="  mt-10 flex flex-col justify-center relative  ml-auto"
        >
          <Quotes className="absolute -top-7 left-0 z-[1]" />
          <h2 className="text-xl from-sidebar-accent-foreground font-semibold z-[3]">
            Code Rate has helped me Land a Job as a Software Engineer after
            learning from my coding mistakes through the percise reviews.
          </h2>
          <p className="mt-7">jane Doe</p>
          <p className="text-sm text-muted-foreground">CEO of ABC Company</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
