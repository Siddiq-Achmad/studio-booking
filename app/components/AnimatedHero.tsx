"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/glow-effect";

const AnimatedHero = () => {
  return (
    <div className="relative">
      <GlowEffect
        colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
        mode="static"
        blur="medium"
      />

      <motion.div
        className="relative h-[60vh] bg-background overflow-hidden rounded-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-[url('https://luxima.id/images/BG.jpg')] bg-cover bg-center rounded-4xl"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10 }}
        />
        <div className="absolute inset-0 bg-blend-color bg-opacity-50 rounded-4xl" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 text-center text-primary"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            LUXIMA Studio
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-center text-primary"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Where Your Vision Comes to Life
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button asChild>
              <Link href="/booking">Book Your Session</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedHero;
