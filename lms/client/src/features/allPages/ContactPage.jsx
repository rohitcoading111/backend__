
import useContactPage from "./hooks/useContactPage";

import SEO from "../../components/SEO.jsx";
import ContactNavbar from "./components/ContactNavbar";
import ContactHero from "./components/ContactHero";
import ContactForm from "./components/ContactForm";
import ContactFooter from "./components/ContactFooter";
import ContactSocialLinks from "./components/ContactSocialLinks";
import "./ContactPage.css";

export default function ContactPage() {
  const {
    formData,
    errors,
    status,
    handleChange,
    handleSubmit,
  } = useContactPage();

  return (
    <main className="learnhub-home learnhub-contact min-h-screen overflow-hidden text-white">
      <SEO
        title="Contact LearnHub – Get in Touch"
        description="Contact LearnHub for questions, learning support and assistance with our online learning platform."
        path="/contact"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <ContactNavbar />

      <ContactHero />

      <ContactSocialLinks />
      <ContactForm
        formData={formData}
        errors={errors}
        status={status}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <ContactFooter />
    </main>
  );
}
