import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import InsidePage from "../components/Insidepage"
import AppointmentForm from "../components/AppointmentForm";

const ExpertisePage = ({ data }) => {
  const pageData = data?.allWpPage?.nodes?.[0]?.expertisePage
  const expertiseList = data?.allWpExpertise?.edges?.slice().reverse() || []

  return (
    <Layout>
    <InsidePage pageId={249} />

    <section className="Contact-Section" id="ContactForm">
          <div className="container">
            <AppointmentForm />
          </div>
        </section>

    </Layout>
  )
}

export default ExpertisePage

export const query = graphql`
   query ExpertisePageQuery {
      allWpExpertise {
        edges {
          node {
            slug
            title
            uri
            content
            featuredImage {
              node {
                altText
                mediaItemUrl
                title
                slug
              }
            }
          }
        }
      }
    }
`