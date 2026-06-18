import React, { useEffect } from "react"
import Lenis from "lenis"
import AOS from "aos"
import "aos/dist/aos.css"

import Header from "./header"
import Footer from "./Footer"

import "../css/common.css"
import "../css/home.css"
import "../css/contact.css"
import "../css/Expertise.css"
import "../css/blog.css"
import "../css/about.css"
import "../css/ui-fixer.css"

const Layout = ({ children }) => {
  useEffect(() => {
    if (typeof window === "undefined") return

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })

    let rafId

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    AOS.init({
      duration: 900,
      easing: "ease-out",
      once: true,
      offset: 120,
    })
    window.AOS = AOS

    setTimeout(() => {
      AOS.refreshHard()
    }, 500)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout