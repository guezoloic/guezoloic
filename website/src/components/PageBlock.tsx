import { motion, useInView } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

const PageBlock = ({ children, id }) => {
  const ref = useRef(null);
  const [amount, setAmount] = useState(0.8);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAmount(window.innerWidth < 430 ? 0.6 : 0.7);
    }
  }, []);

  const isInView = useInView(ref, { amount, once: false });

  return (
    <section
      ref={ref}
      id={id}
      className="w-full z-10 flex justify-center items-center px-6 md:px-8 w-full"
    >
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default PageBlock;