"use client";
import React from "react";
import { Spotlight } from "@/src/app/components/Spotlight-new";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/public/github.svg";
import Image from "next/image";
import Features from "@/components/ui/Features";
import { motion } from "framer-motion";
import Example from "@/components/ui/LogoCloud";
import ComponentName from "@/components/ui/Testimonials";
import Testimonials from "@/components/ui/Testimonials";

export function SpotlightNewDemo() {
  return (
    <>
      <Navbar />
      <div className=" h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-13 tracking-tighter ">
            Instant AI Code Reviews for Your GitHub Repositories
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Fast, accurate, and always available.
          </p>

          <Link
            href="/signin"
            className="mt-6 flex items-center justify-center"
          >
            <Button size={"xl"} className="flex justify-center align-center">
              <Image src={GithubIcon} alt="Github" width={20} height={20} />
              <span className="text-[1rem]">Sign In with GitHub</span>
            </Button>
          </Link>
        </motion.div>
      </div>
      <Features />
      <Example />
      <Testimonials />
    </>
  );
}
export default SpotlightNewDemo;
