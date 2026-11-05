
import { useEffect } from "react";

const features = [
  {
    number: "01",
    category: "STUDENT EXPERIENCE",
    title: "Student Dashboard",
    description:
      "Students can access their enrolled courses, learning statistics and dashboard activities from one place.",
    points: [
      "View enrolled courses",
      "Access learning dashboard",
      "Navigate learning activities",
    ],
    image: "/images/about/dashboard.png",
    alt: "LearnHub student dashboard",
  },
  {
    number: "02",
    category: "COURSE DISCOVERY",
    title: "Explore Online Courses",
    description:
      "Browse published courses, explore categories and review course information and pricing.",
    points: [
      "Browse published courses",
      "Explore course categories",
      "View course descriptions and pricing",
    ],
    image: "/images/about/courseCatalog.png",
    alt: "LearnHub online course catalog",
  },
  {
    number: "03",
    category: "STRUCTURED LEARNING",
    title: "Course Modules",
    description:
      "Courses are organized into modules to provide students with a structured learning experience.",
    points: [
      "View course modules",
      "Explore learning content",
      "Open module lectures",
    ],
    image: "/images/about/module.png",
    alt: "LearnHub course modules",
  },
  {
    number: "04",
    category: "VIDEO LEARNING",
    title: "Lecture Player",
    description:
      "Watch course lectures, control playback speed and mark lectures as completed.",
    points: [
      "Play and pause lectures",
      "Change playback speed",
      "Mark lectures as completed",
    ],
    image: "/images/about/lecturePlayer.png",
    alt: "LearnHub lecture player",
  },
  {
    number: "05",
    category: "LEARNING ANALYTICS",
    title: "Learning Progress",
    description:
      "Students can monitor completed lectures and track their course completion progress.",
    points: [
      "Track completed lectures",
      "View course progress",
      "Monitor learning completion",
    ],
    image: "/images/about/myprogress.png",
    alt: "LearnHub learning progress",
  },
  {
    number: "06",
    category: "LIVE LEARNING",
    title: "Live Classes",
    description:
      "Students can view available live sessions and join sessions associated with their courses.",
    points: [
      "View live sessions",
      "Join live classes",
      "Access course sessions",
    ],
    image: "/images/about/liveclasses.png",
    alt: "LearnHub live classes",
  },
  {
    number: "07",
    category: "INSTRUCTOR EXPERIENCE",
    title: "Instructor Dashboard",
    description:
      "Instructors get a dedicated workspace to access their courses and manage teaching activities.",
    points: [
      "Access instructor dashboard",
      "View managed courses",
      "Manage teaching activities",
    ],
    image: "/images/about/instructorDashboard.png",
    alt: "LearnHub instructor dashboard",
  },
  {
    number: "08",
    category: "COURSE MANAGEMENT",
    title: "Create Courses",
    description:
      "Authorized instructors can create courses and provide course information including title, description, category and pricing.",
    points: [
      "Create new courses",
      "Add course information",
      "Manage course content",
    ],
    image: "/images/about/createcourse.png",
    alt: "LearnHub create course interface",
  },
  {
    number: "09",
    category: "ORGANIZATION DISCOVERY",
    title: "Explore Organizations",
    description:
      "Instructors can explore organizations available through the LearnHub platform.",
    points: [
      "Explore organizations",
      "View organization information",
      "Access organization options",
    ],
    image: "/images/about/exploreOrganisation.png",
    alt: "LearnHub explore organizations",
  },
  {
    number: "10",
    category: "ORGANIZATION MANAGEMENT",
    title: "Organization Dashboard",
    description:
      "Organization administrators can access their organization's dedicated management workspace.",
    points: [
      "Access organization dashboard",
      "Manage organization activities",
      "Navigate management features",
    ],
    image: "/images/about/org-dashboard.png",
    alt: "LearnHub organization dashboard",
  },
  {
    number: "11",
    category: "INSTRUCTOR MANAGEMENT",
    title: "Manage Instructors",
    description:
      "Organization administrators can manage instructors associated with their organization.",
    points: [
      "View organization instructors",
      "Manage instructor assignments",
      "Organize instructor access",
    ],
    image: "/images/about/org-admin.png",
    alt: "LearnHub instructor management",
  },
  {
    number: "12",
    category: "PLATFORM ADMINISTRATION",
    title: "Super Admin Dashboard",
    description:
      "Super administrators access platform-level administrative features and organization management.",
    points: [
      "View administration dashboard",
      "Manage organizations",
      "Access platform controls",
    ],
    image: "/images/about/SuperAdminDashboard.png",
    alt: "LearnHub super admin dashboard",
  },
  {
    number: "13",
    category: "SECURE ENROLLMENT",
    title: "Course Payments",
    description:
      "Students can review course pricing and proceed through the available payment flow when enrolling.",
    points: [
      "View course pricing",
      "Proceed to payment",
      "Complete enrollment payment flow",
    ],
    image: "/images/about/rozarpay.png",
    alt: "LearnHub course payment interface",
  },
];

export default function useAboutPage() {
  useEffect(() => {
    const previousTitle = document.title;

    const description =
      "Explore LearnHub features including student dashboards, online courses, modules, lectures, live classes, instructor tools, organization management and payments.";

    document.title =
      "About LearnHub – Platform Features and Learning Experience";

    const updateMeta = (selector, attribute, key, content) => {
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    updateMeta(
      'meta[name="description"]',
      "name",
      "description",
      description
    );

    updateMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      "About LearnHub – Platform Features"
    );

    updateMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description
    );

    const canonical =
      document.querySelector('link[rel="canonical"]');

    const previousCanonical = canonical?.href;

    if (canonical) {
      canonical.href = "https://learnhubcloud.in/about";
    }

    return () => {
      document.title = previousTitle;

      if (canonical && previousCanonical) {
        canonical.href = previousCanonical;
      }
    };
  }, []);

  return {
    features,
  };
}
