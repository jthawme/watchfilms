import React from "react";
import { motion } from "framer-motion";
import { defaultTransition } from "common/transition";

interface TransitionProps {
  children: React.ReactNode;
}

const Transition: React.FC<TransitionProps> = ({ children }) => {
  return <motion.div {...defaultTransition}>{children}</motion.div>;
};

export { Transition };
