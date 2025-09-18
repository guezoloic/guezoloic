import React from "react";
import { motion } from "framer-motion";
import * as SiIcons from "react-icons/si";
import Section from "./Section";
import { useTranslation } from "react-i18next";


const Skills: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useTranslation();
    
    const skillsData = [
        {
            title: t("skills.content.0"),
            tags: [
                { name: "Linux", icon: SiIcons.SiLinux },
                { name: "Jetson", icon: SiIcons.SiNvidia },
                { name: "Raspberry Pi", icon: SiIcons.SiRaspberrypi },
            ],
        },
        {
            title: t("skills.content.1"),
            tags: [
                { name: "C", icon: SiIcons.SiC },
                { name: "C++", icon: SiIcons.SiCplusplus },
                { name: "Rust", icon: SiIcons.SiRust },
                { name: "Python", icon: SiIcons.SiPython },
            ],
        },
        {
            title: t("skills.content.2"),
            tags: [
                { name: "OpenCV", icon: SiIcons.SiOpencv },
            ],
        },
        {
            title: t("skills.content.3"),
            tags: [
                { name: "Git", icon: SiIcons.SiGit },
                { name: "Docker", icon: SiIcons.SiDocker },
                { name: "Linux", icon: SiIcons.SiLinux },
            ],
        },
        {
            title: t("skills.content.4"),
            tags: [
                { name: "Proxmox", icon: SiIcons.SiProxmox },
                { name: "Linux Server", icon: SiIcons.SiLinux },
                { name: "Docker", icon: SiIcons.SiDocker },
            ],
        },
        {
            title: t("skills.content.5"),
            tags: [
                { name: "Three.js", icon: SiIcons.SiThreedotjs },
                { name: "Ubuntu Server", icon: SiIcons.SiUbuntu },
            ],
        },
    ];
    return (
        <Section id={id} title={t("skills.title")}>
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
        </Section>
    );
};

export default Skills;