import React from "react"
import Header from "./header"
import Footer from "./Footer"
import "../css/common.css"
import "../css/home.css"
import "../css/contact.css"
import "../css/Expertise.css"
import "../css/ui-fixer.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout