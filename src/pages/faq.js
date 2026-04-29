import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import InsidePage from "../components/Insidepage"
import AppointmentForm from "../components/AppointmentForm"

const FAQPage = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqList = data?.allWpFaq?.edges || []

  const toggleFaq = index => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <Layout>
      <InsidePage pageId={292} />

      <section className="faq-section">
        <div className="container">
          <div className="faq-wrapper">
            {faqList.length > 0 ? (
              faqList.map(({ node }, index) => {
                const isActive = activeIndex === index

                return (
                  <div
                    className={`faq-item ${isActive ? "active" : ""}`}
                    key={index}
                  >
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => toggleFaq(index)}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: node?.title,
                        }}
                      />

                      <span className="faq-icon">
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    <div className="faq-answer">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: node?.content,
                        }}
                      />
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="no-faq">No FAQs found.</p>
            )}
          </div>
        </div>
      </section>

    
    </Layout>
  )
}

export default FAQPage

export const query = graphql`
  query FAQPageQuery {
    allWpFaq {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`