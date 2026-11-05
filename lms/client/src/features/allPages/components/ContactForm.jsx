
export default function ContactForm({
  formData,
  errors,
  status,
  handleChange,
  handleSubmit,
}) {
  const inputClass =
    "contact-field mt-2 w-full rounded-xl border px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500";

  const labelClass = "text-sm font-medium text-slate-300";

  const errorClass = "mt-2 text-xs text-red-400";

  return (
    <section
      id="contact-form"
      className="px-5 pb-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">

        {/* CONTACT INFORMATION */}
        <div className="contact-panel rounded-3xl border p-8 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
            Contact Information
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-tight">
            Let's start a conversation.
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-400">
            Whether you have a question about courses, learning
            activities or platform features, use the contact form
            to get in touch with LearnHub.
          </p>

          <div className="mt-10 space-y-5">
            <div className="contact-info-card rounded-xl border p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Platform
              </p>
              <p className="mt-2 font-semibold text-white">
                LearnHub
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Online Learning Platform
              </p>
            </div>

            <div className="contact-info-card rounded-xl border p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Support
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                For questions regarding your account, courses,
                instructors or platform usage, send us a message
                through the contact form.
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="contact-panel rounded-3xl border p-7 sm:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">
              Send a Message
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Fill in the details below to prepare your message.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6 sm:grid-cols-2">

              {/* NAME */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />

                {errors.name && (
                  <p className={errorClass}>{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />

                {errors.email && (
                  <p className={errorClass}>{errors.email}</p>
                )}
              </div>

              {/* SUBJECT */}
              <div className="sm:col-span-2">
                <label htmlFor="subject" className={labelClass}>
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is your message about?"
                  value={formData.subject}
                  onChange={handleChange}
                  className={inputClass}
                />

                {errors.subject && (
                  <p className={errorClass}>{errors.subject}</p>
                )}
              </div>

              {/* MESSAGE */}
              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClass}>
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-y`}
                />

                {errors.message && (
                  <p className={errorClass}>{errors.message}</p>
                )}
              </div>
            </div>

            {status && (
              <p
                role="status"
                className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm leading-6 text-cyan-300"
              >
                {status}
              </p>
            )}

            <button
              type="submit"
              className="learnhub-about-action mt-7 w-full rounded-xl px-6 py-4 font-bold"
            >
              Prepare Message
            </button>

            <p className="mt-4 text-center text-xs leading-6 text-slate-500">
              Your default email application will be used to
              prepare the message once the support email is configured.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
