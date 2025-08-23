import React from "react";
import Section from "./Section";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiHuggingface, SiLeetcode } from "react-icons/si";

interface SocialLink {
    name: string;
    url: string;
    icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
    { name: "Email", url: "mailto:me@guezoloic.com", icon: <FaEnvelope /> },
    { name: "LinkedIn", url: "https://linkedin.com/in/guezoloic", icon: <FaLinkedin /> },
    { name: "GitHub", url: "https://github.com/guezoloic", icon: <FaGithub /> },
    { name: "HuggingFace", url: "https://huggingface.co/guezoloic", icon: <SiHuggingface /> },
    { name: "LeetCode", url: "https://leetcode.com/guezoloic", icon: <SiLeetcode /> },
];

const SocialLinks: React.FC<{ id: string }> = ({ id }) => {
    return (
        <Section id={id} title="Socials">
            <div className="flex flex-wrap gap-4 justify-center">
                {socialLinks.map((link, i) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 font-medium text-lg px-4 py-2 bg-black/30 rounded-xl shadow-lg hover:scale-105 transform transition-transform"
                        style={{ backdropFilter: "blur(8px)" }}
                    >
                        {link.icon}
                        <span>{link.name}</span>
                    </a>
                ))}
            </div>
        </Section>
    );
};

export default SocialLinks;