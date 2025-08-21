import { motion } from 'framer-motion';
import React from 'react';

const PageBlock = ({ children, id }) => {
    return (
        <motion.section
            id={id}
            className="min-h-1/3 md:min-h-1/2 flex items-center justify-center m-6 relative z-40"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.69 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.section>
    );
};

export default PageBlock;