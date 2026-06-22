import React, { useEffect } from "react"

import Header from "./header"
import Footer from "./Footer"

import "../css/common.css"
import "../css/home.css"
import "../css/contact.css"
import "../css/Expertise.css"
import "../css/blog.css"
import "../css/about.css"
import "../css/ui-fixer.css"

import "aos/dist/aos.css"

const Layout = ({ children }) => {
  useEffect(() => {
    if (typeof window === "undefined") return

    let lenis
    let rafId
    let idleId
    let cancelled = false
    let isIdleCallback = false

    const isMobileOrTablet = window.innerWidth <= 1024
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const loadScrollEffects = async () => {
      const AOSModule = await import("aos")
      const AOS = AOSModule.default

      if (cancelled) return

      AOS.init({
        duration: 650,
        easing: "ease-out-cubic",
        once: true,
        offset: 80,
        disable: window.innerWidth <= 767,
      })

      window.AOS = AOS

      setTimeout(() => {
        if (!cancelled) {
          AOS.refresh()
        }
      }, 300)

      if (!isMobileOrTablet && !isTouchDevice && !prefersReducedMotion) {
        const LenisModule = await import("lenis")
        const Lenis = LenisModule.default

        if (cancelled) return

        lenis = new Lenis({
          duration: 0.9,
          smoothWheel: true,
          syncTouch: false,
        })

        const raf = (time) => {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)
      }
    }

    if ("requestIdleCallback" in window) {
      isIdleCallback = true
      idleId = window.requestIdleCallback(loadScrollEffects)
    } else {
      idleId = setTimeout(loadScrollEffects, 500)
    }

    return () => {
      cancelled = true

      if (isIdleCallback && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId)
      } else {
        clearTimeout(idleId)
      }

      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      if (lenis) {
        lenis.destroy()
      }
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