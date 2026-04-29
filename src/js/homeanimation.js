import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const homeAnimation = () => {
  if (typeof window === "undefined") return

  gsap.registerPlugin(ScrollTrigger)

 const tl = gsap.timeline({
  delay: 0.25,
  defaults: {
    ease: "power3.out",
  },
})

tl.fromTo(
  "header",
  { y: -70, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8 }
)
  .fromTo(
    ".hero-section .left",
    {
      opacity: 0,
      scale: 1.08,
     
    },
    {
      opacity: 1,
      scale: 1,
     
      duration: 1.6,
      ease: "power2.out",
    },
    "-=0.2"
  )
  .fromTo(
    ".hero-section .right h1",
    {
      y: 80,
      opacity: 0,
      clipPath: "inset(100% 0 0 0)",
    },
    {
      y: 0,
      opacity: 1,
      clipPath: "inset(0% 0 0 0)",
      duration: 1,
      ease: "power4.out",
    },
    "-=0.9"
  )
  .fromTo(
    ".hero-section .right p",
    {
      y: 50,
      opacity: 0,
      clipPath: "inset(100% 0 0 0)",
    },
    {
      y: 0,
      opacity: 1,
      clipPath: "inset(0% 0 0 0)",
      duration: 0.85,
      ease: "power4.out",
    },
    "-=0.55"
  )
  .fromTo(
    ".hero-section .btn-wrap",
    {
      y: 25,
      opacity: 0,
      clipPath: "inset(100% 0 0 0)",
    },
    {
      y: 0,
      opacity: 1,
      clipPath: "inset(0% 0 0 0)",
      duration: 0.7,
      ease: "power4.out",
    },
    "-=0.4"
  )

  // ABOUT SECTION IMAGE ANIMATION
  // Images start from center and move to original position on scroll

  const aboutSection = document.querySelector(".about-section")
  const aboutImages = gsap.utils.toArray(".about-section .img-item")

  if (aboutSection && aboutImages.length > 0) {
    setTimeout(() => {
      const sectionRect = aboutSection.getBoundingClientRect()

      const centerX = sectionRect.left + sectionRect.width / 2
      const centerY =
        sectionRect.top + window.pageYOffset + sectionRect.height / 2

      aboutImages.forEach(item => {
        const rect = item.getBoundingClientRect()

        const itemCenterX = rect.left + rect.width / 2
        const itemCenterY = rect.top + window.pageYOffset + rect.height / 2

        gsap.set(item, {
          x: centerX - itemCenterX,
          y: centerY - itemCenterY,
          scale: 0.75,
          opacity: 0,
          zIndex: 5,
        })
      })

      gsap.to(aboutImages, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        zIndex: 1,
        duration: 2.5,
        ease: "power2.out",
        stagger: 0.28,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          end: "+=1200",
          scrub: 2.5,
        },
      })

      ScrollTrigger.refresh()
    }, 600)
  }

  // GUIDING PRINCIPLES IMAGE BLUE OVERLAY REVEAL
  // Blue overlay covers image first, then drops down/reveals image on scroll

  const guidingSection = document.querySelector(".Guiding-Principles")
  const guidingOverlay = document.querySelector(
    ".Guiding-Principles .blue-image-overlay"
  )

  if (guidingSection && guidingOverlay) {
    gsap.set(".Guiding-Principles .blue-image-overlay", {
      height: "100%",
    })

    gsap.set(
      ".Guiding-Principles .guiding-image-reveal .gatsby-image-wrapper, .Guiding-Principles .guiding-image-reveal img",
      {
        scale: 1.12,
      }
    )

    gsap.to(
      ".Guiding-Principles .guiding-image-reveal .gatsby-image-wrapper, .Guiding-Principles .guiding-image-reveal img",
      {
        scale: 1,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".Guiding-Principles",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    )

    gsap.to(".Guiding-Principles .blue-image-overlay", {
      height: "0%",
      duration: 0.8,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".Guiding-Principles",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })
  }
// CLINICAL FOCUS SLIDER ANIMATION
const clinicalSection = document.querySelector(".Areas-of-Clinical-Focus")

if (clinicalSection) {
  setTimeout(() => {
    const clinicalCards = gsap.utils.toArray(
      ".Areas-of-Clinical-Focus .clinical-card"
    )

    if (clinicalCards.length === 0) return

    const clinicalTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".Areas-of-Clinical-Focus",
        start: "top 80%",
        // markers: true,
        toggleActions: "play none none none",
      },
      defaults: {
        ease: "power3.out",
      },
    })

    clinicalTl
      .fromTo(
        ".Areas-of-Clinical-Focus h2 span",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      )
      .fromTo(
        ".Areas-of-Clinical-Focus h2",
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.2"
      )
      .fromTo(
        ".Areas-of-Clinical-Focus .top-text",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.25"
      )
      .fromTo(
        clinicalCards,
        {
          y: 80,
          opacity: 0,
          scale: 0.92,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
        },
        "-=0.1"
      )
      .fromTo(
        ".clinical-prev, .clinical-next",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: "back.out(1.8)",
        },
        "-=0.5"
      )

    ScrollTrigger.refresh()
  }, 1000)
}


// GUIDING NEW SECTION IMAGE REVEAL
const guidingNewSection = document.querySelector(".guiding-new-section")

if (guidingNewSection) {
  gsap.set(
    ".guiding-new-section .guiding-principle-reveal .blue-image-overlay",
    {
      height: "100%",
    }
  )

  gsap.set(
    ".guiding-new-section .guiding-principle-reveal .gatsby-image-wrapper, .guiding-new-section .guiding-principle-reveal img",
    {
      scale: 1.12,
    }
  )

  const guidingNewTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".guiding-new-section",
      start: "top 70%",
      markers: false,
      toggleActions: "play none none none",
    },
  })

  guidingNewTl
    .fromTo(
      ".guiding-new-section h2",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    )
    .to(
      ".guiding-new-section .guiding-principle-reveal .blue-image-overlay",
      {
        height: "0%",
        duration: 1.7,
        ease: "power4.inOut",
      },
      "-=0.2"
    )
    .to(
      ".guiding-new-section .guiding-principle-reveal .gatsby-image-wrapper, .guiding-new-section .guiding-principle-reveal img",
      {
        scale: 1,
        duration: 1.7,
        ease: "power4.out",
      },
      "<"
    )
    .fromTo(
      ".guiding-new-section .div-wrapper > span",
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    )
}

// CLINICAL EVALUATION SECTION ANIMATION
const clinicalEvaluationSection = document.querySelector(".clinical-evaluation")

if (clinicalEvaluationSection) {
  const clinicalEvalTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".clinical-evaluation",
      start: "top 65%",
      markers: false,
      toggleActions: "play none none none",
    },
    defaults: {
      ease: "power3.out",
    },
  })

  clinicalEvalTl
    .fromTo(
      ".clinical-evaluation h2 span",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
    .fromTo(
      ".clinical-evaluation h2",
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "-=0.25"
    )
    .fromTo(
      ".clinical-evaluation .top-para",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.25"
    )
    .fromTo(
      ".clinical-evaluation .left li",
      {
        x: -70,
        opacity: 0,
        filter: "blur(8px)",
      },
      {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.75,
        stagger: 0.16,
      },
      "-=0.1"
    )
    .fromTo(
      ".clinical-evaluation .right .img-wrap",
      {
       
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power4.out",
      },
      "-=0.75"
    )
}


// FOOTER FADE IN ANIMATION
const footerSection = document.querySelector(".site-footer")

if (footerSection) {
  gsap.fromTo(
    ".site-footer",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".site-footer",
        start: "top 85%",
        markers: false,
        toggleActions: "play none none none",
      },
    }
  )
}

}