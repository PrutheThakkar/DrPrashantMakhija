import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AppointmentForm = () => {
  const [formMessage, setFormMessage] = useState("");

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phone: Yup.string().required("Phone Number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setFormMessage("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          message: values.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      console.log("API response:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data?.details || data?.message || "Something went wrong"
        );
      }

      resetForm();

      setFormMessage(
        "Thank you! Your message has been sent. We'll get back to you shortly."
      );
    } catch (error) {
      console.error("Form submit error:", error);

      setFormMessage(
        error?.message ||
          "There was an error trying to send your message. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      }}
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
            <Field
              as="textarea"
              name="message"
              rows="3"
              placeholder="your message"
            />
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
                marginTop: 12,
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