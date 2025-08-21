import React from "react";
import { motion } from "framer-motion";
import * as SiIcons from "react-icons/si";

const skillsData = [
    {
        title: "Embedded Systems",
        tags: [
            { name: "Linux", icon: SiIcons.SiLinux },
            { name: "Jetson", icon: SiIcons.SiNvidia },
            { name: "Raspberry Pi", icon: SiIcons.SiRaspberrypi },
            { name: "STM32", icon: SiIcons.SiStmicroelectronics },
            { name: "ATtiny85", icon: null },
        ],
    },
    {
        title: "Low-level & Performance",
        tags: [
            { name: "C", icon: SiIcons.SiC },
            { name: "C++", icon: SiIcons.SiCplusplus },
            { name: "Rust", icon: SiIcons.SiRust },
            { name: "SIMD SSE/NEON", icon: null },
        ],
    },
    {
        title: "AI & Computer Vision",
        tags: [
            { name: "Neural Networks", icon: null },
            { name: "OpenCV", icon: SiIcons.SiOpencv },
            { name: "Jetson Deployment", icon: SiIcons.SiNvidia },
        ],
    },
    {
        title: "Software Engineering",
        tags: [
            { name: "Git", icon: SiIcons.SiGit },
            { name: "Docker", icon: SiIcons.SiDocker },
            { name: "Linux", icon: SiIcons.SiLinux },
            { name: "Zsh", icon: SiIcons.SiZsh },
            { name: "Modern C++", icon: SiIcons.SiCplusplus },
        ],
    },
    {
        title: "Servers",
        tags: [
            { name: "Proxmox", icon: SiIcons.SiProxmox },
            { name: "Linux Server", icon: SiIcons.SiLinux },
            { name: "Docker", icon: SiIcons.SiDocker },
            { name: "Automation", icon: null },
        ],
    },
    {
        title: "Extra",
        tags: [
            { name: "Three.js", icon: SiIcons.SiThreedotjs },
            { name: "Ubuntu Server", icon: SiIcons.SiUbuntu },
        ],
    },
];

const Skills: React.FC = () => {
    return (
        <section className="relative max-w-5xl mx-auto bg-gradient-to-br mt-5 from-black/60 to-black/30 backdrop-blur-lg rounded-2xl p-6 md:p-12 flex flex-col gap-8 text-gray-100 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-200 via-green-400 via-green-500 via-emerald-600 to-green-800 text-center">
                Skills
            </h2>

            <div className="flex flex-col gap-4 w-full">
                {skillsData.map((section, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                        <div className="flex flex-wrap gap-3">
                            {section.tags.map((tag, j) => {
                                const Icon = tag.icon;
                                return (
                                    <motion.div
                                        key={j}
                                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-black/40 transition-colors"
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, amount: 0 }}
                                        transition={{ duration: 0.5, delay: j * 0.08 }}
                                    >
                                        {Icon && <Icon className="w-5 h-5 text-emerald-400 mt-1" />}
                                        <span className="text-sm md:text-base">{tag.name}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;