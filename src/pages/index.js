import React, { useEffect, useState } from "react"
// import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { homeAnimation } from "../js/homeanimation"
// import Lenis from "lenis"
// import AOS from "aos"
// import "aos/dist/aos.css"

import ClinicalFocusSlider from "../components/ClinicalFocusSlider"
// import AppointmentForm from "../components/AppointmentForm";
import InkBlobBackground from "../components/InkBlobBackground"
import watercolorBg from "../images/Hero-Image.jpg"

import prashantSmallLogo from "../images/prashant-small-logo.svg"

const HomePage = ({ data }) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  const pageData = data?.allWpPage?.nodes[0]?.homePage

  const heroTitle = pageData?.heroTitle
  const heroSubtitle = pageData?.heroSubtitle
  const heroBrainImage = getImage(pageData?.heroBrainImage?.node)
  const heroBrainImageAlt = pageData?.heroBrainImage?.node?.altText

  // const aboutImageList = pageData?.aboutImages.aboutImageList || []
  const aboutnextimage = getImage(pageData?.aboutDoctorImage?.node)
  const guidingPrincipleImage = getImage(pageData?.guidingPrincipleImage?.node)

  const clinicalEvaluationRightImage = getImage(pageData?.clinicalEvaluationRightImage?.node)

  useEffect(() => {
  if (typeof window === "undefined") return

  const timer = setTimeout(() => {
    setIsPageLoaded(true)
  }, 350)

  return () => clearTimeout(timer)
}, [])

  // useEffect(() => {
  //   const hidePreloader = () => {
  //     setTimeout(() => {
  //       setIsPageLoaded(true)
  //     }, 1000)
  //   }

  //   if (typeof window !== "undefined") {
  //     if (document.readyState === "complete") {
  //       hidePreloader()
  //     } else {
  //       window.addEventListener("load", hidePreloader)
  //     }
  //   }

  //   const fallbackTimer = setTimeout(() => {
  //     setIsPageLoaded(true)
  //   }, 5000)

  //   return () => {
  //     window.removeEventListener("load", hidePreloader)
  //     clearTimeout(fallbackTimer)
  //   }
  // }, [])

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     smoothWheel: true,
  //   })

  //   let rafId

  //   function raf(time) {
  //     lenis.raf(time)
  //     rafId = requestAnimationFrame(raf)
  //   }

  //   rafId = requestAnimationFrame(raf)

  //   AOS.init({
  //     duration: 900,
  //     easing: "ease-out",
  //     once: true,
  //     offset: 120,
  //   })

  //   return () => {
  //     cancelAnimationFrame(rafId)
  //     lenis.destroy()
  //   }
  // }, [])

  useEffect(() => {
    if (isPageLoaded) {
      homeAnimation()
    }
  }, [isPageLoaded])

  return (
    <Layout>
      <>
        {!isPageLoaded && (
          <div className="site-preloader">
            <div className="preloader-inner">
              <div className="preloader-logo-img">
                <img
                  src={prashantSmallLogo}
                  alt="Dr. Prashant Makhija Logo"
                />
              </div>

              <div className="preloader-logo">Dr. Prashant Makhija</div>
              <div className="preloader-line"></div>
            </div>
          </div>
        )}

        <div className={`page-content ${isPageLoaded ? "page-loaded" : ""}`}>
          <section className="hero-section" data-aos="fade-in">
            {/* <InkBlobBackground imageUrl={watercolorBg} className="hero-ink-bg"> */}
              <div className="container">
                <div className="left">
                  <div className="brain-wrapper">
                    {heroBrainImage ? (
                      <GatsbyImage
                        image={heroBrainImage}
                        alt={heroBrainImageAlt || "Brain image"}
                        className="brain-main-image"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                      />
                    ) : (
                      <img
                        src="https://app.drprashantmakhija.com/wp-content/uploads/2026/05/brain-new-img.png"
                        alt="brain img"
                        className="brain-main-image"
                        loading="eager"
                      />
                    )}
                  </div>
                </div>

                <div className="right">
                  {heroTitle && <h1 dangerouslySetInnerHTML={{ __html: heroTitle }} />}

                  {heroSubtitle && <p dangerouslySetInnerHTML={{ __html: heroSubtitle }} />}

                  <div className="btn-wrap">
                    <a href="/contact" className="btn">
                      Book An Appointment
                    </a>
                  </div>
                </div>
              </div>
            {/* </InkBlobBackground> */}
          </section>

          <section id="Guiding-Principles " className="Guiding-Principles guiding-new-sec about">
            <div className="container">
              <h2 data-aos="fade-up">
                <span>{pageData.aboutTitle}</span>
                {pageData.aboutSubtitle}
              </h2>

              <div className="div-wrapper" >
                <div className="img-wrap guiding-image-reveal" >
                  {aboutnextimage ? (
                    <GatsbyImage
                      image={aboutnextimage}
                      alt={"brain img"}
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src="https://app.drprashantmakhija.com/wp-content/uploads/2026/03/Brain.png"
                      alt="brain img"
                      loading="lazy"
                    />
                  )}

                  <span className="blue-image-overlay"></span>
                </div>

                <div className="paragraph-wrappper" data-aos="fade-left">
                  <h3>Dr. Prashant Makhija </h3>
                  <ul>
                    <li><p>MBBS</p></li>
                    <li><p>MD (Medicine)</p></li>
                    <li><p>DM (Neurology)</p></li>
                  </ul>
                  <span dangerouslySetInnerHTML={{ __html: pageData.aboutDoctorPara }} />

                  {/* <a href="#" className="btn-appt">
                    Know More
                  </a> */}
                </div>
              </div>
            </div>
          </section>

          <section id="about-section" className="about-section">
            <div className="container">


              <div className="center-text" >
                <p dangerouslySetInnerHTML={{ __html: pageData.aboutPara }} />
              </div>

              <ul>
                {pageData.aboutImages?.map((imageItem, index) => (
                  <li key={index} className="img-item">
                    <div className="img-wrap">
                      <GatsbyImage
                        image={imageItem.aboutImageList.node.gatsbyImage}
                        alt={imageItem.aboutImageList.node.altText || ""}
                        loading="lazy"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>



          <ClinicalFocusSlider pageData={pageData} />

          <section className="Guiding-Principles guiding-new-section">
            <div className="container">
              <h2>
                <span>{pageData.guidingPrincipleSubtitle}</span>
                {pageData.guidingPrincipleTitle}
              </h2>

              <div className="div-wrapper" data-aos="fade-up">
                <div className="img-wrap guiding-principle-reveal">
                  {guidingPrincipleImage ? (
                    <GatsbyImage
                      image={guidingPrincipleImage}
                      alt={"brain img"}
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src="https://app.drprashantmakhija.com/wp-content/uploads/2026/03/Brain.png"
                      alt="brain img"
                      loading="lazy"
                    />
                  )}

                  <span className="blue-image-overlay"></span>
                </div>

                <span data-aos="fade-up" dangerouslySetInnerHTML={{ __html: pageData.guidingPrinciplePara }} />

              </div>
            </div>
          </section>

          <section className="clinical-evaluation">
            <div className="container">

              <h2 data-aos="fade-up">
                <span>{pageData.clinicalEvaluationSubtitle}</span>
                {pageData.clinicalEvaluationTitle}
              </h2>

              <p data-aos="fade-up" className="top-para" dangerouslySetInnerHTML={{ __html: pageData.clinicalEvaluationPara }} />

              <div className="wrapper">
                <div className="left">
                  <ul>
                    {pageData.clinicalEvaluationList?.map((item, index) => (
                      <li
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 150}
                      >
                        <div className="img-wrap">
                          <GatsbyImage
                            image={item.listImage.node.gatsbyImage}
                            alt={item.listImage.node.altText || ""}
                            loading="lazy"
                          />
                        </div>

                        <div className="text">
                          <h3>{item.listTitle}</h3>
                          <p>{item.listSubtitle}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="right">
                  <div
                    className="img-wrap"
                    data-aos="scale-up-img"
                    data-aos-duration="1200"
                    data-aos-easing="ease-out"
                  >
                    {clinicalEvaluationRightImage ? (
                      <GatsbyImage
                        image={clinicalEvaluationRightImage}
                        alt={"brain img"}
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src="https://app.drprashantmakhija.com/wp-content/uploads/2026/03/Brain.png"
                        alt="brain img"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <section className="Contact-Section" id="ContactForm">
            <div className="container">
              <h2>
                <span>Send your details to schedule a neurology consultation</span>
               Consultation Enquiry
              </h2>
              <AppointmentForm />
            </div>
          </section> */}
        </div>
      </>

    </Layout>
  )
}

export const query = graphql`
 query MyQuery {
  allWpPage(filter: {databaseId: {eq: 22}}) {
    nodes {
     title
      homePage {
        heroSubtitle
        heroTitle
        heroBrainImage {
          node {
            altText
            gatsbyImage(height: 724, width: 792, placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
        aboutTitle
        aboutSubtitle
        aboutPara
        aboutImages {
          aboutImageList {
            node {
              altText
              gatsbyImage(width: 600, height: 300, layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        aboutDoctorImage{
         node {
            altText
            gatsbyImage(height: 614, width: 1228, placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
        aboutDoctorPara
        clinicalFocusTitle
        clinicalFocusSubtitle
        clinicalFocusPara
        guidingPrincipleTitle
        guidingPrincipleSubtitle
        guidingPrincipleImage{
          node {
            altText
            gatsbyImage(height: 614, width: 1228, placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
        guidingPrinciplePara
        clinicalEvaluationTitle
        clinicalEvaluationSubtitle
        clinicalEvaluationPara
        clinicalEvaluationRightImage{
           node {
            altText
            gatsbyImage(height: 989, width: 1484, placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
        clinicalEvaluationList{
          listTitle
          listSubtitle
          listImage{
            node {
            altText
            gatsbyImage(height: 76, width: 75, placeholder: BLURRED, layout: CONSTRAINED)
          }
          }
        }
      }
    }
  }
}
`;

export default HomePage