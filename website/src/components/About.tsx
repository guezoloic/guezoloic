import React, { JSX } from "react";
import { motion } from "framer-motion";
import * as SOLID from "@heroicons/react/24/solid";
import { useTranslation } from 'react-i18next';
import Section from "./Section";

const About: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslation();
  
  const paragraphs: { icon: any; text: string }[] = [
    { icon: SOLID.LightBulbIcon, text: t('about.content.0') },
    { icon: SOLID.CodeBracketIcon, text: t('about.content.1') },
    { icon: SOLID.CpuChipIcon, text: t('about.content.2') },
    { icon: SOLID.ChartPieIcon, text: t('about.content.3') },
    { icon: SOLID.WrenchScrewdriverIcon, text: t('about.content.4') },
    { icon: SOLID.RocketLaunchIcon, text: t('about.content.5') },
    { icon: SOLID.ServerStackIcon, text: t('about.content.6') }
  ];

  return (
    <Section id={id} title={t('about.title')}>
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