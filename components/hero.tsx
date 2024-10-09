"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heading } from "@/components/ui/heading";
import { Container } from "@/components/ui/container";
import SynergMugs from "@/public/assets/mugs.png";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  return (
    <Container size={"twoxl"}>
      {" "}
      <div className="md:flex items-center mb-20">
        {/* Text section */}
        <div className="md:[478px]">
          <Heading
            size={"md"}
            tracking={"tighter"}
            fontWeight={"bold"}
            className="mt-6"
          >
            SynergERP <br />
            Finance Indaba
          </Heading>
          <p className="text-xl text-left tracking-tighter mt-6 max-w-[500px]">
            Finance Indaba is just around the corner! Don’t miss your chance to
            secure a spot and experience everything our team has in store for
            you. Visit us at Exhibition Stand 47
          </p>

          <div className="flex gap-3 items-center mt-[30px]  mb-10">
            <Button>
           <Link href={"https://evolve.eventoptions.co.za/register/finindabaprof2024/details"} target="_blank">
           Sign Up
           </Link>
            </Button>
            <Button variant={"outline"}>
              <Link href={"https://share.hsforms.com/1sz101ey6RAC9zTw7dyb4Pg58qan"} target="_blank">Competition</Link>
            </Button>
          </div>
        </div>
        {/* Image section */}
        <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
          <motion.img
            src={SynergMugs.src}
            width={550}
            height={600}
            className="md:absolute md:max-w-none top-[200px] md:right-0 rounded-xl"
            style={{
              translateY: translateY,
            }}
          />
        </div>
      </div>
   
    </Container>
  );
};

export default Hero;
