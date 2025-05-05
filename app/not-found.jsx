"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search, ArrowLeft, RefreshCw, Compass, MapPin, Frown, Smile, ChevronRight } from "lucide-react"

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSearching, setIsSearching] = useState(false)
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true when component mounts
  useEffect(() => {
    setIsMounted(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / windowSize.width - 0.5,
        y: e.clientY / windowSize.height - 0.5,
      })
    }

    if (isMounted) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMounted, windowSize])

  // Simulate search functionality
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      setTimeout(() => {
        setIsSearching(false)
        setSearchQuery("")
      }, 2000)
    }
  }

  // Popular pages for quick navigation
  const popularPages = [
    { name: "Accueil", path: "/" },
    { name: "Produits", path: "/produits" },
    { name: "Services", path: "/services" },
    { name: "À propos", path: "/a-propos" },
    { name: "Contact", path: "/contact" },
  ]

  // Generate random positions for background elements
  const generateRandomPosition = (index) => {
    if (!isMounted) return { x: 0, y: 0, scale: 1 }

    const randomX = Math.random() * windowSize.width
    const randomY = Math.random() * windowSize.height
    const randomScale = Math.random() * 0.5 + 0.5

    return {
      x: randomX,
      y: randomY,
      scale: randomScale,
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background elements - Only render when component is mounted */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const randomPos = generateRandomPosition(i)
            const randomSize = Math.random() * 200 + 50

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-yellow-400/10 dark:bg-yellow-400/5"
                initial={{
                  x: randomPos.x,
                  y: randomPos.y,
                  scale: randomPos.scale,
                }}
                animate={{
                  x: [randomPos.x, Math.random() * windowSize.width],
                  y: [randomPos.y, Math.random() * windowSize.height],
                  scale: [randomPos.scale, Math.random() * 0.5 + 1],
                }}
                transition={{
                  duration: Math.random() * 20 + 20,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                style={{
                  width: `${randomSize}px`,
                  height: `${randomSize}px`,
                  opacity: Math.random() * 0.5 + 0.1,
                }}
              />
            )
          })}
        </div>
      )}

      <div className="container max-w-5xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column: 404 visual */}
          <div className="order-2 lg:order-1">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="text-[180px] md:text-[250px] font-extrabold leading-none text-center lg:text-left"
                style={{
                  textShadow: "6px 6px 0px rgba(250, 204, 21, 0.5)",
                  WebkitTextStroke: "2px rgba(250, 204, 21, 0.8)",
                  color: "transparent",
                }}
                animate={{
                  x: mousePosition.x * 20,
                  y: mousePosition.y * 20,
                }}
                transition={{ type: "spring", stiffness: 75, damping: 30 }}
              >
                404
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-yellow-400/20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              <motion.div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.div
                  className="relative flex items-center justify-center w-32 h-32"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-400/50 dark:border-yellow-400/30" />
                </motion.div>

                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl"
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  {isHoveringButton ? <Smile className="text-yellow-500" /> : <Frown className="text-yellow-500" />}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column: Content */}
          <motion.div
            className="order-1 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-block px-4 py-1 rounded-full bg-yellow-400/20 text-yellow-500 text-sm font-medium mb-6"
            >
              Page introuvable
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Oups ! Vous vous êtes <span className="text-yellow-500">égaré</span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              La page que vous recherchez semble avoir disparu dans l'espace-temps. Pas d'inquiétude, nous pouvons vous
              aider à retrouver votre chemin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Pages populaires</h3>

              <div className="flex flex-wrap gap-3">
                {popularPages.map((page, index) => (
                  <motion.div
                    key={page.path}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  >
                    <Link href={page.path}>
                      <span className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:text-yellow-500 dark:hover:text-yellow-400 hover:border-yellow-200 dark:hover:border-yellow-800 transition-all">
                        {page.name === "Accueil" ? (
                          <Home className="mr-2" size={16} />
                        ) : page.name === "Produits" ? (
                          <Compass className="mr-2" size={16} />
                        ) : page.name === "Contact" ? (
                          <MapPin className="mr-2" size={16} />
                        ) : (
                          <div className="w-4 mr-2" />
                        )}
                        {page.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Back button */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Link href="/">
                <motion.button
                  className="group relative px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-yellow-400/30"
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center">
                    <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    Retour à l'accueil
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
