import { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Search,
  ShoppingBag,
} from "lucide-react";
import CourseCard from "../components/CourseCard";
import { getPublishedCourses } from "../services/courseService";
import { useEffect } from "react";
import { createPayment } from "../../payments/services/paymentService";

function CourseCatalog() {
  const [search, setSearch] = useState("");

  // Actual backend API connect karne ke baad yahan courses aayenge.
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getPublishedCourses();
      setCourses(result?.data?.courses ?? []);
    } catch (err) {
      console.error("Courses fetch error:", err);
      setError(
        err.response?.data?.message || "Courses load nahi ho paaye."
      );
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);

  const filteredCourses = courses.filter((course) =>
    course.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuy = (course) => {
    // Next step: selected course ko checkout page par bhejenge.
    console.log("Selected course:", course._id);
  };

  return (
  <div className="h-screen overflow-y-auto bg-[#f7f7f5] text-[#171717]">
      <header className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
              <GraduationCap size={23} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">LearnHub</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                Learn without limits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <ShoppingBag size={18} />
            Course store
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <section className="relative overflow-hidden rounded-3xl bg-[#101010] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute -right-10 -top-16 h-60 w-60 rounded-full border border-white/[0.08]" />

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-300">
              <BookOpen size={13} />
              Your next chapter starts here
            </span>

            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Invest in your
              <span className="block text-neutral-400">next big skill.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
              Explore courses, build practical skills and move closer to
              your goals with LearnHub.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Explore the library
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Find your next course
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                Choose a course that fits your learning goals.
              </p>
            </div>

            <label className="flex w-full items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 sm:max-w-xs">
              <Search size={18} className="text-neutral-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search courses..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
            </label>
          </div>

         
{loading ? (
  <div className="mt-7 py-16 text-center text-sm text-neutral-500">
    Loading courses...
  </div>
) : error ? (
  <div className="mt-7 py-16 text-center text-sm text-red-600">
    {error}
  </div>
) : filteredCourses.length > 0 ? (
  <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {filteredCourses.map((course) => (
      <CourseCard
        key={course._id}
        course={course}
        onBuy={handleBuy}
      />
    ))}
  </div>
) : (
  <div className="mt-7 rounded-2xl border border-dashed border-black/15 bg-white px-6 py-16 text-center sm:py-20">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f7f5]">
      <BookOpen size={25} strokeWidth={1.5} />
    </div>

    <h3 className="mt-5 text-lg font-semibold">
      {search ? "No matching courses" : "No published courses yet"}
    </h3>

    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
      {search
        ? "Try a different search term."
        : "Published courses will appear here."}
    </p>
  </div>
)}

        </section>

        <footer className="mt-14 border-t border-black/[0.07] py-6 text-xs text-neutral-400">
          © {new Date().getFullYear()} LearnHub · Your learning journey.
        </footer>
      </main>
    </div>
  );
}

export default CourseCatalog;
