import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import ClinicalFocusSlider from "../components/ClinicalFocusSlider"
import AppointmentForm from "../components/AppointmentForm";

const HomePage = ({ data }) => {
  const pageData = data?.allWpPage?.nodes[0]?.homePage

  const heroTitle = pageData?.heroTitle
  const heroSubtitle = pageData?.heroSubtitle
  const heroBrainImage = getImage(pageData?.heroBrainImage?.node)
  const heroBrainImageAlt = pageData?.heroBrainImage?.node?.altText

  const aboutImageList = pageData?.aboutImages.aboutImageList || []
  const aboutnextimage = getImage(pageData?.aboutDoctorImage?.node)
  const guidingPrincipleImage = getImage(pageData?.guidingPrincipleImage?.node)

  const clinicalEvaluationRightImage = getImage(pageData?.clinicalEvaluationRightImage?.node)
  return (
    <Layout>
      <>
        <section className="hero-section">
          <div className="container">
            <div className="left">
              <div className="brain-wrapper">
                {heroBrainImage ? (
                  <GatsbyImage
                    image={heroBrainImage}
                    alt={heroBrainImageAlt || "brain img"}
                  />
                ) : (
                  <img
                    src="https://prashant.studiosentientdemo.com/wp-content/uploads/2026/03/Brain.png"
                    alt="brain img"
                  />
                )}
              </div>
            </div>

            <div className="right">
              {heroTitle && (
                <h1 dangerouslySetInnerHTML={{ __html: heroTitle }} />
              )}

              {heroSubtitle && (
                <p dangerouslySetInnerHTML={{ __html: heroSubtitle }} />
              )}

              <div className="btn-wrap">
                <a href="#ContactForm" className="btn">
                  Book An Appointment
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="about-section" className="about-section">
          <div className="container">
            <h2>
              <span>About Dr. Prashant Makhija</span>
              Dedicated to Brain &amp; Nerve Health
            </h2>

            <div className="center-text">
              <p>
                Dr. Prashant Makhija is a Consultant Neurologist with advanced
                <br />
                training in clinical neurology and a focused interest in conditions
                <br />
                affecting the brain and nervous system.
              </p>
            </div>

            <ul>
              <li className="img-item">
                <div className="img-wrap">
                  <img src="https://prashant.studiosentientdemo.com/wp-content/uploads/2026/03/Neuron.jpg" alt="Neuron cells" />
                </div>
              </li>

              <li className="img-item">
                <div className="img-wrap">
                  <img src="https://prashant.studiosentientdemo.com/wp-content/uploads/2026/03/Brain.jpg" alt="Brain scan" />
                </div>
              </li>

              <li className="img-item">
                <div className="img-wrap">
                  <img src="https://prashant.studiosentientdemo.com/wp-content/uploads/2026/03/Diagnosis-1.jpg" alt="Diagnosis" />
                </div>
              </li>

              <li className="img-item">
                <div className="img-wrap">
                  <img src="https://prashant.studiosentientdemo.com/wp-content/uploads/2026/03/MRI.jpg" alt="MRI scan" />
                </div>
              </li>
            </ul>
          </div>
        </section> */}

        <section id="about-section" className="about-section">
          <div className="container">

            <h2>
              <span>{pageData.aboutTitle}</span>
              {pageData.aboutSubtitle}
            </h2>


            <div className="center-text">
              <p dangerouslySetInnerHTML={{ __html: pageData.aboutPara }} />
            </div>

            <ul>
              {pageData.aboutImages?.map((imageItem, index) => (
                <li key={index} className="img-item">
                  <div className="img-wrap">
                    <GatsbyImage
                      image={imageItem.aboutImageList.node.gatsbyImage}
                      alt={imageItem.aboutImageList.node.altText || ""}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="Guiding-Principles " className="Guiding-Principles about">
          {/* <div className="container"> */}
            <div className="div-wrapper">
              <div className="img-wrap">

                {aboutnextimage ? (
                  <GatsbyImage
                    image={aboutnextimage}
                    alt={"brain img"}
                  />
                ) : (
                  <img
                    src="https://prashant.studiosentientdemo.com/wp-content/uploads/2026/03/Brain.png"
                    alt="brain img"
                  />
                )}
              </div>

              <div className="paragraph-wrappper">
              <span dangerouslySetInnerHTML={{ __html: pageData.aboutDoctorPara }} />

              {/* <a href="#" className="btn-appt">
                Know More
              </a> */}
              </div>
            </div>
          {/* </div> */}
        </section>

        <ClinicalFocusSlider pageData={pageData} />


        <section className="Guiding-Principles">
          <div className="container">
            <h2>
              <span>{pageData.guidingPrincipleSubtitle}</span>
              {pageData.guidingPrincipleTitle}
            </h2>

            <div className="div-wrapper">
              <div className="img-wrap">

                {guidingPrincipleImage ? (
                  <GatsbyImage
                    image={guidingPrincipleImage}
                    alt={"brain img"}
                  />
                ) : (
                  <img
                    src="https://prashant.studiosentientdemo.com/wp-content/uploads/2026/03/Brain.png"
                    alt="brain img"
                  />
                )}
              </div>

              <span dangerouslySetInnerHTML={{ __html: pageData.guidingPrinciplePara }} />

            </div>
          </div>
        </section>

        <section className="clinical-evaluation">
          <div className="container">

            <h2>
              <span>{pageData.clinicalEvaluationSubtitle}</span>
              {pageData.clinicalEvaluationTitle}
            </h2>

            <p className="top-para" dangerouslySetInnerHTML={{ __html: pageData.clinicalEvaluationPara }} />

            <div className="wrapper">
              <div className="left">
                <ul>
                  {pageData.clinicalEvaluationList?.map((item, index) => (
                    <li key={index}>
                      <div className="img-wrap">
                        <GatsbyImage
                          image={item.listImage.node.gatsbyImage}
                          alt={item.listImage.node.altText || ""}
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
                <div className="img-wrap">
                  {clinicalEvaluationRightImage ? (
                    <GatsbyImage
                      image={clinicalEvaluationRightImage}
                      alt={"brain img"}
                    />
                  ) : (
                    <img
                      src="https://prashant.studiosentientdemo.com/wp-content/uploads/2026/03/Brain.png"
                      alt="brain img"
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
            gatsbyImage(height: 724, width: 605, placeholder: BLURRED, layout: CONSTRAINED)
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
            gatsbyImage(height: 800, width: 1920, placeholder: BLURRED, layout: CONSTRAINED)
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