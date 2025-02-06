"use client"

import { motion } from "framer-motion"

const AnimatedHero = () => {
  return (
    <motion.div
      className="relative h-[60vh] bg-gray-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10 }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          LUXIMA Studio
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Where Your Vision Comes to Life
        </motion.p>
        <motion.button
          className="bg-gold-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gold-600 transition-colors"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Our Services
        </motion.button>
      </div>
    </motion.div>
  )
}

export default AnimatedHero

