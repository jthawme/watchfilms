import { Variants } from "framer-motion";

export const variants: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const fadeInVariants: (delay?: number) => Variants = (delay) => ({
  initial: {
    opacity: 0,
    y: 10,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0.0, 0.2, 1],
      delay,
    },
  },
});

export const defaultTransition = {
  initial: "initial",
  animate: "enter",
  exit: "hide",
  variants,
};

export const fadeInTransition = (delay: number) => ({
  initial: "initial",
  animate: "enter",
  variants: fadeInVariants(delay),
});
