import { motion } from "framer-motion";
import React from "react";
import Section from "./Section";

interface AcknowledgeItem {
    type: string;
    list: string[];
}

const acknowledge: AcknowledgeItem[] = [
    {
        type: "Models",
        list: ["Desk: Pedro Belthori"],
    },
];

const Acknowledgement: React.FC<{ id: string }> = ({ id }) => {
    return (
        <Section id={id} title="Acknowledgements">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {acknowledge.map((category, i) => (
                    <motion.div
                        key={category.type}
                        className="bg-black/30 p-6 rounded-2xl shadow-lg flex flex-col gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        <h3 className="text-xl font-semibold text-white">{category.type}</h3>
                        <ul className="text-gray-200 text-sm list-disc list-inside">
                            {category.list.map((item, j) => (
                                <li key={j}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Acknowledgement;