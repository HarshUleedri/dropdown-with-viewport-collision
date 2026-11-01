import Dropdown from "./components/Dropdown";
import { motion } from "motion/react";

export default function App() {
  return (
    <div className="h-[1000px] w-full  bg-[radial-gradient(circle,#d9d9d9_1px,transparent_1px)] pt-96 bg-size-[18px_18px]">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="mx-auto w-1/3 flex flex-col  gap-12 items-center justify-center p-16 rounded-xl shadow bg-white"
      >
        <p className="font-mono text-3xl text-center">Dropdown with viewport collision </p>
        <Dropdown />
      </motion.div>
    </div>
  );
}
