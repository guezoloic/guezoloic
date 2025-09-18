import React from "react";
import Section from "./Section";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiHuggingface, SiLeetcode } from "react-icons/si";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  description: string;
}


const Social: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useTranslation();
    
    const socialLinks: SocialLink[] = [
      { name: "Email", url: "mailto:loicguezo@gmail.com", icon: <FaEnvelope />, description: t("links.descriptions.0") },
      { name: "LinkedIn", url: "https://linkedin.com/in/guezoloic", icon: <FaLinkedin />, description: t("links.descriptions.1") },
      { name: "GitHub", url: "https://github.com/guezoloic", icon: <FaGithub />, description: t("links.descriptions.2") },
      { name: "LeetCode", url: "https://leetcode.com/guezoloic", icon: <SiLeetcode />, description: t("links.descriptions.3") },
    ];
    
  return (
    <Section id={id} title={t("links.label")}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {socialLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start gap-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 font-medium text-xl md:text-2xl px-6 py-4 bg-black/30 rounded-2xl shadow-xl hover:scale-105 transform hover:shadow-2xl"
            style={{ backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-4">
              {link.icon && <span className="text-3xl md:text-4xl">{link.icon}</span>}
              <span>{link.name}</span>
            </div>
            <p className="text-sm md:text-base text-gray-200/70">{link.description}</p>
          </motion.a>
        ))}
      </div>
    </Section>
  );
};

export default Social;