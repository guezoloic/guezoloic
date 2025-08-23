import React, { JSX } from "react";
import { motion } from "framer-motion";
import * as SOLID from "@heroicons/react/24/solid";
import Section from "./Section";

const About: React.FC<{ id: string }> = ({ id }) => {
  const paragraphs: { icon; text: string }[] = [
    {
      icon: SOLID.LightBulbIcon,
      text: "Curious by nature, I love exploring what really happens under the hood of a computer."
    },
    {
      icon: SOLID.CodeBracketIcon,
      text: "I started with simple Python programs and gradually discovered my fascination for low-level computing."
    },
    {
      icon: SOLID.CpuChipIcon,
      text: "Learning Intel x86 assembly at School and working with retro-computing kits, I realized I truly enjoy building things from scratch and understanding them at the most fundamental level."
    },
    {
      icon: SOLID.ChartPieIcon,
      text: "Over time, I specialized in low-level programming (C, C++, Rust, SIMD) and embedded systems (STM32, Jetson, Raspberry Pi, ATtiny85)."
    },
    {
      icon: SOLID.WrenchScrewdriverIcon,
      text: "I enjoy creating efficient solutions, from custom math libraries with SSE/NEON to fine-tuning device trees for hardware integration."
    },
    {
      icon: SOLID.RocketLaunchIcon,
      text: "Recently, I have combined this expertise with modern innovation by deploying AI and computer vision models on embedded devices and experimenting with edge computing."
    },
    {
      icon: SOLID.ServerStackIcon,
      text: "Beyond embedded engineering, I also work on servers, AI projects, and game engines, balancing hardware and software to make each project both challenging and rewarding."
    }
  ];

  return (
    <Section id={id} title="Hi, I'm Loïc! 👋">
      <div className="grid grid-cols-1 gap-1 w-full">
        {paragraphs.map((paragraph, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3 w-full rounded-xl p-4 hover:bg-black/40 transition-colors"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.6, delay: i * 0.09 }}
          >
            <span className="mt-1 text-emerald-400"><paragraph.icon className="w-6 h-6" /></span>
            <p className="text-sm md:text-base leading-relaxed">{paragraph.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default About;