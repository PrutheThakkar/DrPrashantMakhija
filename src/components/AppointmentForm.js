import React, { useState } from "react";
import { navigate } from "gatsby";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const WEBSITE_URL = process.env.GATSBY_WEBSITE_URL;
const CF7_FORM_ID = process.env.GATSBY_CF7_FORM_ID || "7";

const AppointmentForm = () => {
  const [formMessage, setFormMessage] = useState("");

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phone: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setFormMessage("");

      if (!WEBSITE_URL) {
        setFormMessage("Missing GATSBY_WEBSITE_URL in .env");
        setSubmitting(false);
        return;
      }

      const bodyFormData = new FormData();
      bodyFormData.set("first-name", values.firstName);
      bodyFormData.set("last-name", values.lastName);
      bodyFormData.set("phone", values.phone);
      bodyFormData.set("email", values.email);
      bodyFormData.set("message", values.message);
      bodyFormData.set("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);

      const response = await axios.post(
        `${WEBSITE_URL}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          withCredentials: false,
        }
      );

      if (response?.data?.status === "validation_failed") {
        setFormMessage(response?.data?.message || "Validation failed.");
        setSubmitting(false);
        return;
      }

      // if (response?.data?.status === "mail_sent") {
      //   resetForm();
      //   setSubmitting(false);
      //   navigate("/thank-you/");
      //   return;
      // }

      if (response?.data?.status === "mail_sent") {
        resetForm();
        setSubmitting(false);
        setFormMessage("Thank you! Your message has been sent. We'll get back to you shortly.");
        return;
      }

      setFormMessage(response?.data?.message || "Something went wrong.");
      setSubmitting(false);
    } catch (error) {
      console.error("CF7 submit error:", error);

      const status = error?.response?.status;
      const data = error?.response?.data;
      const msg =
        data?.message ||
        (status ? `Request failed (HTTP ${status})` : "") ||
        error?.message ||
        "Unknown error";

      setFormMessage(msg);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", phone: "", email: "", message: "" }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="appointment-form">
          <div className="form-group">
            <Field type="text" name="firstName" placeholder="First Name" />
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field type="text" name="lastName" placeholder="Last Name" />
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field type="tel" name="phone" placeholder="Phone Number" />
            <ErrorMessage name="phone" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field as="textarea" name="message" rows="3" placeholder="your message" />
            <ErrorMessage name="message" component="div" className="error" />
          </div>

          <div className="btn-wrap">
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Consult Now"}
            </button>
          </div>

          {formMessage && (
            <div
              className="wpcf7-response-output"
              style={{
                color: formMessage.startsWith("Thank you") ? "green" : "red",
                marginTop: 12
              }}
            >
              {formMessage}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AppointmentForm;