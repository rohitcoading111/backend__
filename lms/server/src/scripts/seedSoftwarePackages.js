import connectDb from "../config/db.js";
import SoftwarePackage from "../models/softwarePackage.model.js";

const softwarePackages = [
  {
    name: "Basic",
    slug: "basic",
    description: "Suitable for small websites and simple business needs.",
    price: null,
    features: [
      {
        key: "responsive-design",
        label: "Responsive Design",
        description: "Website optimized for mobile, tablet and desktop.",
      },
      {
        key: "upto-3-pages",
        label: "Up to 3 Pages",
        description: "Includes up to five predefined website pages.",
      },
      {
        key: "contact-form",
        label: "Contact Form",
        description: "A basic contact form for customer inquiries.",
      },
      {
        key: "basic-seo",
        label: "Basic SEO",
        description: "Basic on-page SEO setup.",
      },
      {
        key: "deployment",
        label: "Deployment",
        description: "Website deployment and basic setup.",
      },
    ],
  },

  {
    name: "Medium",
    slug: "medium",
    description: "Suitable for businesses requiring dynamic functionality.",
    price: null,
    features: [
      {
        key: "responsive-design",
        label: "Responsive Design",
        description: "Responsive interface for different screen sizes.",
      },
      {
        key: "authentication",
        label: "Authentication",
        description: "User registration and login functionality.",
      },
      {
        key: "database",
        label: "Database Integration",
        description: "Database integration for storing application data.",
      },
      {
        key: "admin-dashboard",
        label: "Admin Dashboard",
        description: "Dashboard to manage application data.",
      },
      {
        key: "crud",
        label: "CRUD Operations",
        description: "Create, read, update and delete functionality.",
      },
      {
        key: "api-integration",
        label: "API Integration",
        description: "Integration with relevant third-party APIs.",
      },
      {
        key: "deployment",
        label: "Deployment",
        description: "Application deployment and setup.",
      },
    ],
  },

  {
    name: "Advanced",
    slug: "advanced",
    description: "Suitable for complex and feature-rich applications.",
    price: null,
    features: [
      {
        key: "responsive-design",
        label: "Responsive Design",
        description: "Responsive design across devices.",
      },
      {
        key: "role-based-auth",
        label: "Role-Based Authentication",
        description: "Multiple roles and permission-based access.",
      },
      {
        key: "advanced-dashboard",
        label: "Advanced Dashboard",
        description: "Advanced application management dashboard.",
      },
      {
        key: "payment-integration",
        label: "Payment Integration",
        description: "Payment gateway integration.",
      },
      {
        key: "ai-integration",
        label: "AI Integration",
        description: "AI-powered features where applicable.",
      },
      {
        key: "realtime-features",
        label: "Real-Time Features",
        description: "Real-time functionality where applicable.",
      },
      {
        key: "scalable-backend",
        label: "Scalable Backend",
        description: "Structured backend architecture.",
      },
      {
        key: "deployment",
        label: "Deployment",
        description: "Application deployment and setup.",
      },
    ],
  },
];

const seedSoftwarePackages = async () => {
  try {
    await connectDb();

    for (const softwarePackage of softwarePackages) {
      await SoftwarePackage.findOneAndUpdate(
        { slug: softwarePackage.slug },
        softwarePackage,
        {
          upsert: true,
          new: true,
        }
      );
    }

    console.log("Software packages seeded successfully");
  } catch (error) {
    console.error("Error seeding software packages:", error);
  } finally {
    process.exit();
  }
};

seedSoftwarePackages();