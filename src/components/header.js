import React, { useEffect, useState } from "react"

const Header = () => {
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMega = e => {
    e.preventDefault()
    setMegaOpen(prev => !prev)
  }

  const closeMega = () => {
    setMegaOpen(false)
  }

  const toggleMobile = () => {
    setMobileOpen(prev => !prev)
  }

  const closeMobile = () => {
    setMobileOpen(false)
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleKeyDown = e => {
      if (e.key === "Escape") {
        closeMega()
        closeMobile()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    if (typeof window === "undefined") return

    const menuItems = document.querySelectorAll(".menu-item[data-target]")

    const handleScrollClick = e => {
      e.preventDefault()

      const targetId = e.currentTarget.getAttribute("data-target")
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const headerOffset = 60
        const elementPosition = targetSection.getBoundingClientRect().top
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }

      closeMega()
      closeMobile()
    }

    menuItems.forEach(item =>
      item.addEventListener("click", handleScrollClick)
    )

    return () => {
      menuItems.forEach(item =>
        item.removeEventListener("click", handleScrollClick)
      )
    }
  }, [])

  return (
    <>
      <header>
        <div className="container wrapper">
          <a href="/" className="logo">
            <img
              src="https://prashant.studiosentientdemo.com/wp-content/uploads/2026/03/logo-img.svg"
              alt="Logo"
            />
          </a>

          {/* Desktop Menu */}
          <ul className="menu-list">
            <li className="menu-item">
              <a href="/">Home</a>
            </li>

            <li data-target="about-section" className="menu-item">
              <a href="#about-section">About</a>
            </li>

             <li className="menu-item">
              <a href="/expertise">Expertise</a>
            </li>

            {/* <li
              data-target="Areas-of-Clinical-focus"
              className={`menu-item has-mega active ${megaOpen ? "open" : ""}`}
              id="expertise-trigger"
            >
              <a href="/expertise" onClick={toggleMega}>
                Expertise
              </a>
            </li> */}

            <li className="menu-item contact">
              <a href="/contact">Contact</a>
            </li>
          </ul>

          {/* Burger Button */}
          <button
            className={`burger-btn ${mobileOpen ? "open" : ""}`}
            onClick={toggleMobile}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? "open" : ""}`}
        onClick={closeMobile}
      ></div>

      {/* Mobile Menu Drawer */}
      <nav className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <ul className="mobile-menu-list">
          <li className="mobile-menu-item">
            <a href="#" onClick={closeMobile}>Home</a>
          </li>

          <li data-target="about-section" className="mobile-menu-item">
            <a href="#about-section" onClick={closeMobile}>About</a>
          </li>

          <li
            data-target="Areas-of-Clinical-focus"
            className="mobile-menu-item"
          >
            <a href="#Areas-of-Clinical-focus" onClick={closeMobile}>
              Expertise
            </a>
          </li>

          <li className="mobile-menu-item">
            <a href="#" onClick={closeMobile}>Insights</a>
          </li>

          <li className="mobile-menu-item contact">
            <a href="#" onClick={closeMobile}>Contact</a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Header