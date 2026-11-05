
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Search,
  ShoppingBag,
  ArrowUpRight,
  Loader2,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import CourseCard from "../components/CourseCard";
import { getPublishedCourses } from "../services/courseService";
import {
  createPayment,
  verifyPayment,
} from "../../payments/services/paymentService";
import { getMyEnrollments } from "../../enrollments/services/enrollmentService";

const SEO_TITLE =
  "Online Courses | Explore Expert-Led Courses – LearnHub";

const SEO_DESCRIPTION =
  "Explore online courses on LearnHub. Discover expert-led courses, develop practical skills, learn from instructors, and advance your knowledge.";

const CANONICAL_URL = "https://learnhubcloud.in/courses";

function CourseCatalog() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [purchasedCourseIds, setPurchasedCourseIds] = useState(new Set());

  const [loading, setLoading] = useState(true);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchaseError, setPurchaseError] = useState("");
  const [buyingCourseId, setBuyingCourseId] = useState(null);

  // SEO: Set page-specific metadata
  useEffect(() => {
    document.title = SEO_TITLE;

    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute("content", SEO_DESCRIPTION);

    let canonicalTag = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute("href", CANONICAL_URL);

    // Open Graph metadata
    const setMeta = (property, content, attribute = "property") => {
      let tag = document.querySelector(
        `meta[${attribute}="${property}"]`
      );

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, property);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    };

    setMeta("og:type", "website");
    setMeta("og:site_name", "LearnHub");
    setMeta("og:title", SEO_TITLE);
    setMeta("og:description", SEO_DESCRIPTION);
    setMeta("og:url", CANONICAL_URL);
    setMeta(
      "og:image",
      "https://learnhubcloud.in/og-image.png"
    );

    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", SEO_TITLE, "name");
    setMeta("twitter:description", SEO_DESCRIPTION, "name");
    setMeta(
      "twitter:image",
      "https://learnhubcloud.in/og-image.png",
      "name"
    );
  }, []);

  // SEO: Structured data for the course listing
  useEffect(() => {
    if (!courses.length) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Online Courses – LearnHub",
      description: SEO_DESCRIPTION,
      url: CANONICAL_URL,
      isPartOf: {
        "@type": "WebSite",
        name: "LearnHub",
        url: "https://learnhubcloud.in/",
      },
      mainEntity: {
        "@type": "ItemList",
        name: "Available Online Courses",
        numberOfItems: courses.length,
        itemListElement: courses.map((course, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Course",
            name: course.title,
            description: course.description || "",
            provider: {
              "@type": "Organization",
              name: "LearnHub",
              sameAs: "https://learnhubcloud.in/",
            },
          },
        })),
      },
    };

    let script = document.getElementById(
      "learnhub-course-structured-data"
    );

    if (!script) {
      script = document.createElement("script");
      script.id = "learnhub-course-structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(structuredData);

    return () => {
      script?.remove();
    };
  }, [courses]);

  // Fetch published courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getPublishedCourses();
      setCourses(result?.data?.courses ?? []);
    } catch (err) {
      console.error("Courses fetch error:", err);

      setError(
        err.response?.data?.message ||
          "Courses could not be loaded. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch student enrollments
  const fetchEnrollments = async () => {
    try {
      setEnrollmentsLoading(true);

      const result = await getMyEnrollments();
      const enrollments = result?.data?.enrollments ?? [];

      const courseIds = enrollments
        .map((enrollment) => enrollment.course?._id)
        .filter(Boolean);

      setPurchasedCourseIds(new Set(courseIds));
    } catch (err) {
      console.error("Enrollments fetch error:", err);
    } finally {
      setEnrollmentsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  // Search courses
  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return courses;

    return courses.filter((course) =>
      course.title?.toLowerCase().includes(query)
    );
  }, [courses, search]);

  // Handle course purchase
  const handleBuy = async (course, isPurchased = false) => {
    if (isPurchased) {
      navigate("/dashboard", { replace: true });
      return;
    }

    if (buyingCourseId) return;

    try {
      setPurchaseError("");
      setBuyingCourseId(course._id);

      // Create Razorpay order
      const result = await createPayment(course._id);
      const order = result.data;

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay Checkout is not loaded. Please refresh the page."
        );
      }

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "LearnHub",
        description: course.title,
        order_id: order.orderId,

        handler: async (response) => {
          try {
            const verification = await verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (verification.success) {
              setPurchasedCourseIds((previous) => {
                const updated = new Set(previous);
                updated.add(course._id);
                return updated;
              });

              navigate("/dashboard", { replace: true });
            } else {
              setPurchaseError(
                "Payment verification could not be completed."
              );
            }
          } catch (err) {
            console.error("Payment verification failed:", err);

            setPurchaseError(
              err.response?.data?.message ||
                "Payment verification failed. Please contact support."
            );
          } finally {
            setBuyingCourseId(null);
          }
        },

        modal: {
          ondismiss: () => {
            setBuyingCourseId(null);
          },
        },

        theme: {
          color: "#171717",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);

        setPurchaseError(
          response.error?.description ||
            "Payment failed. Please try again."
        );

        setBuyingCourseId(null);
      });

      razorpay.open();
    } catch (err) {
      console.error("Payment start failed:", err);

      setPurchaseError(
        err.response?.data?.message ||
          err.message ||
          "Unable to start payment. Please try again."
      );

      setBuyingCourseId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#171717] antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-black/[0.07] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#171717] text-white">
              <GraduationCap size={23} />
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight">
                LearnHub
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                Learn without limits
              </p>
            </div>
          </div>

          {/* HEADER ACTIONS */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-black/[0.07] bg-neutral-50 px-4 py-2 text-xs font-medium text-neutral-600 sm:flex">
              <ShoppingBag size={15} />
              Course Store
            </div>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="group inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-neutral-800"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {/* HERO SECTION */}
        <section className="relative isolate overflow-hidden rounded-[28px] bg-[#101010] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/[0.08]" />

          <div className="pointer-events-none absolute -right-10 -top-16 h-60 w-60 rounded-full border border-white/[0.08]" />

          <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-white/[0.03] blur-3xl" />

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-300">
              <BookOpen size={13} />
              Your next chapter starts here
            </span>

            <h1 className="mt-7 text-4xl font-semibold leading-[1.1] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Explore online courses
              <span className="block text-neutral-400">
                and build your next big skill.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
              Discover expert-led online courses, develop practical
              skills and move closer to your goals with LearnHub.
            </p>

            <button
              type="button"
              onClick={() =>
                document.getElementById("course-library")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              Explore courses
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

        {/* COURSE LIBRARY */}
        <section
          id="course-library"
          className="scroll-mt-24 mt-12 sm:mt-16"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Explore the library
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Find your next course
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Choose an online course that fits your learning goals.
              </p>
            </div>

            {/* SEARCH */}
            <label className="flex w-full items-center gap-3 rounded-xl border border-black/[0.08] bg-white px-4 py-3 transition focus-within:border-black sm:max-w-sm">
              <Search size={18} className="shrink-0 text-neutral-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search courses..."
                aria-label="Search online courses"
                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-xs text-neutral-400 hover:text-black"
                >
                  Clear
                </button>
              )}
            </label>
          </div>

          {/* PURCHASE ERROR */}
          {purchaseError && (
            <div className="mt-6 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              <p>{purchaseError}</p>

              <button
                type="button"
                onClick={() => setPurchaseError("")}
                className="font-semibold"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* RESULTS COUNT */}
          {!loading && !error && (
            <div className="mt-8 flex items-center justify-between">
              <p className="text-xs text-neutral-500">
                {filteredCourses.length}{" "}
                {filteredCourses.length === 1 ? "course" : "courses"} found
              </p>
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-neutral-500">
              <Loader2 size={25} className="animate-spin" />
              <p className="text-sm">Loading courses...</p>
            </div>
          ) : error ? (
            <div className="mt-8 rounded-2xl border border-black/[0.08] bg-white px-6 py-16 text-center">
              <p className="text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={fetchCourses}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
              >
                <RefreshCw size={15} />
                Try again
              </button>
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => {
                const isPurchased = purchasedCourseIds.has(course._id);

                return (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onBuy={handleBuy}
                    isPurchased={isPurchased}
                    buying={buyingCourseId === course._id}
                    disabled={
                      Boolean(buyingCourseId) ||
                      enrollmentsLoading
                    }
                  />
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-black/15 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f7f5]">
                <BookOpen size={25} strokeWidth={1.5} />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {search
                  ? "No matching courses"
                  : "No published courses yet"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
                {search
                  ? "Try searching with a different course name."
                  : "Published courses will appear here once they are available."}
              </p>
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="mt-16 border-t border-black/[0.07] py-7 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} LearnHub · Your learning journey.
        </footer>
      </main>
    </div>
  );
}

export default CourseCatalog;
