import { useEffect, useState } from "react";
import { BookOpenCheck, LockKeyhole, ShieldCheck } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  acceptOrganizationPolicies,
  getOrganizationPolicyStatus,
} from "../services/organizationPolicyService.js";

const policySections = {
  terms: [
    {
      title: "1. Platform use and organization responsibilities",
      body: "LearnHub provides tools for organizations to manage learning content, instructors, enrollments, and related services. Your organization is responsible for using those tools lawfully, keeping its information accurate, and ensuring its administrators and instructors follow these terms.",
    },
    {
      title: "2. Account registration and administration",
      body: "Organization Admin access is for authorized representatives of the organization. Keep account details current, limit access to people who need it, and notify LearnHub promptly if an administrator leaves or access may be compromised. Do not impersonate another person or organization.",
    },
    {
      title: "3. Course creation and publishing",
      body: "The organization is responsible for the courses and materials it submits, including accuracy, appropriate permissions, and compliance with applicable law. Do not publish content that infringes others' rights, is deceptive, or is unlawful. LearnHub may restrict content that violates platform rules.",
    },
    {
      title: "4. Instructor management",
      body: "Organization Admins are responsible for inviting, managing, and removing instructors associated with their organization. Grant access only to authorized instructors and promptly remove access when it is no longer needed.",
    },
    {
      title: "5. Student enrollment and access",
      body: "The organization is responsible for administering its courses and instructor-led learning activities. Do not use student accounts or enrollment data for purposes unrelated to providing or managing learning services.",
    },
    {
      title: "6. Payments and platform fees",
      body: "Payments are processed through the payment provider presented during checkout and remain subject to that provider's terms. A separate Pricing & Platform Fee Policy will define the applicable platform fee. Do not rely on an unpublished fee percentage in this agreement.",
    },
    {
      title: "7. Refunds and cancellations",
      body: "Refund eligibility, cancellation handling, and any time limits will be described in the applicable course and payment terms. The organization must provide accurate course information and cooperate with legitimate payment or refund inquiries. Jurisdiction-specific requirements may apply.",
    },
    {
      title: "8. Organization payouts and settlement timelines",
      body: "Payout eligibility, deductions, verification requirements, and settlement timelines depend on the payment provider, account verification, and the separate payout terms communicated by LearnHub. A dashboard estimate is not a confirmation that funds have been transferred.",
    },
    {
      title: "9. Prohibited activities",
      body: "Do not misuse the platform, interfere with its operation, attempt unauthorized access, upload malicious material, misrepresent courses or credentials, or use learner information for spam, discrimination, or unlawful purposes.",
    },
    {
      title: "10. Suspension and termination",
      body: "LearnHub may restrict or suspend access where reasonably necessary to address suspected abuse, security concerns, legal requirements, or violations of these terms. Where appropriate, LearnHub may request information or provide notice before taking action.",
    },
    {
      title: "11. Policy updates and disputes",
      body: "LearnHub may update these terms as the platform changes. Material policy updates will have a new version and may require renewed acceptance. Dispute procedures and governing-law terms must be reviewed and finalized for the applicable jurisdictions before production use.",
    },
    {
      title: "12. Do not commit fraud",
      body: "Do not use LearnHub to facilitate fraud, payment abuse, identity theft, falsification of records, or other dishonest activity. Do not submit fabricated organization, instructor, course, enrollment, or payment information.",
    },
    {
      title: "13. Do not mislead or make false claims",
      body: "Do not make false, deceptive, or unsubstantiated claims about courses, instructors, qualifications, outcomes, certificates, prices, or LearnHub. Do not promise results your organization cannot support.",
    },
    {
      title: "14. Keep organization information accurate",
      body: "Provide current and accurate organization contact, ownership, and administrative information. Update it when it changes and do not impersonate another person or organization.",
    },
    {
      title: "15. Publish clear course information",
      body: "Describe course content, prerequisites, schedules, included materials, and instructor information clearly. Correct material errors promptly and do not advertise content that is not actually provided.",
    },
    {
      title: "16. Respect intellectual property",
      body: "Upload or publish only content your organization created or has permission to use. Do not copy, distribute, or make available material in violation of copyright, trademark, privacy, publicity, or other rights.",
    },
    {
      title: "17. Do not publish harmful content",
      body: "Do not publish unlawful, threatening, harassing, discriminatory, sexually exploitative, deceptive, or otherwise harmful content. Do not use courses or communications to encourage illegal conduct or harm.",
    },
    {
      title: "18. Manage student enrollment fairly",
      body: "Use enrollment and course-access controls for legitimate learning purposes. Do not create enrollments without authorization, interfere with a learner's legitimate access, or share learner accounts.",
    },
    {
      title: "19. Communicate appropriately",
      body: "Use platform communications for relevant organization and learning matters. Do not send spam, phishing messages, deceptive promotions, or unsolicited messages that misuse learner or instructor contact information.",
    },
    {
      title: "20. Do not bypass payment processes",
      body: "Payments are handled by the provider presented during checkout and remain subject to its terms. Do not misrepresent payment status or ask users to bypass the displayed payment process.",
    },
    {
      title: "21. Platform fee policy",
      body: "A separate Pricing & Platform Fee Policy will define the applicable platform fee and how it is applied. This agreement does not set or promise a fee percentage. Review applicable pricing information before offering paid courses.",
    },
    {
      title: "22. Refunds and cancellations",
      body: "Follow the refund and cancellation terms shown for the relevant course and transaction, along with applicable law. Provide accurate information and cooperate with legitimate refund or payment inquiries.",
    },
    {
      title: "23. Payouts and settlements",
      body: "Payout eligibility, verification, deductions, and settlement timing depend on the payment provider and separate payout terms. Dashboard amounts may be estimates; do not treat them as proof that a transfer occurred.",
    },
    {
      title: "24. Do not access or test systems without permission",
      body: "Do not probe, scan, test, or attempt to access systems, accounts, or data without explicit authorization. Report suspected vulnerabilities through LearnHub's published support channel.",
    },
    {
      title: "25. Policy changes and legal review",
      body: "Material policy changes will receive a new version and may require renewed acceptance. Dispute handling, governing law, and other jurisdiction-specific terms require qualified legal review before production use.",
    },
  ],
  security: [
    {
      title: "1. Account security responsibilities",
      body: "Use organization accounts only for authorized work. Keep recovery methods and contact details current, restrict administrator access, and promptly report suspected account compromise.",
    },
    {
      title: "2. Password and authentication security",
      body: "Use a unique, hard-to-guess password and never share passwords or one-time codes. Sign out from shared devices and use the authentication methods made available by LearnHub.",
    },
    {
      title: "3. Access tokens and sessions",
      body: "Treat authentication tokens, session cookies, and verification codes as confidential credentials. Do not copy them into messages, source code, screenshots, or public issue trackers. Revoke sessions or report them if exposure is suspected.",
    },
    {
      title: "4. Organization data isolation",
      body: "Use only the organization data you are authorized to access. Do not try to view, change, export, or infer another organization's records, even if a link or identifier is known.",
    },
    {
      title: "5. Student and instructor data",
      body: "Access student and instructor information only as needed to provide and administer learning services. Keep it confidential, use it for the stated purpose, and do not disclose it to unauthorized people.",
    },
    {
      title: "6. Payment information",
      body: "Payments are handled through the payment provider integrated with LearnHub. Follow the provider's instructions and do not send payment credentials or sensitive financial information through ordinary email or chat.",
    },
    {
      title: "7. Data storage and access",
      body: "LearnHub stores and processes information needed to operate the service. Access should be limited to authorized users and service processes. Do not upload information that is unnecessary for the learning service or that you lack permission to provide.",
    },
    {
      title: "8. Security incident reporting",
      body: "Promptly report suspected unauthorized access, accidental disclosure, lost devices containing organization information, or other security incidents through LearnHub's published support channel. Include relevant details but do not send passwords, tokens, or full payment credentials.",
    },
    {
      title: "9. Data retention and deletion",
      body: "Information may be retained while needed to provide the service, meet operational needs, or address legal obligations. Requests to correct or delete organization data should be made through the designated support process and may be subject to applicable retention requirements.",
    },
    {
      title: "10. Protect confidential information",
      body: "Take reasonable care to protect confidential information, use approved devices and networks where practical, and ensure people you authorize understand their confidentiality responsibilities.",
    },
    {
      title: "11. Secure your devices",
      body: "Use devices with a screen lock and current security updates where practical. Do not leave an authenticated organization account unattended on a shared or public device.",
    },
    {
      title: "12. Limit and review account access",
      body: "Give access only to people who need it for their role. Review access periodically and remove or update it promptly when a person leaves or changes responsibilities.",
    },
    {
      title: "13. Collect only necessary data",
      body: "Do not request or upload personal information that is not needed for the learning service. Make sure your organization is authorized to provide information before adding it to LearnHub.",
    },
    {
      title: "14. Share information carefully",
      body: "Verify recipients before sending organization, student, or instructor information. Do not post private information in public forums, public folders, or group chats with unauthorized members.",
    },
    {
      title: "15. Protect downloads and exports",
      body: "Download or export information only when needed. Protect files from unauthorized access and check the intended recipients and destination before sharing.",
    },
    {
      title: "16. Watch for phishing and impersonation",
      body: "Be cautious with unexpected links, attachments, payment requests, or messages claiming to be from LearnHub. Verify unusual requests through a known, trusted contact method before acting.",
    },
    {
      title: "17. Do not upload malicious material",
      body: "Do not upload malware, harmful scripts, credential-stealing links, or files intended to compromise users or systems. Do not use the platform to distribute malicious content.",
    },
    {
      title: "18. Use trusted networks where practical",
      body: "Avoid entering credentials on untrusted networks or devices. When using public networks, take reasonable steps to protect your connection and do not ignore browser security warnings.",
    },
    {
      title: "19. Report incidents promptly",
      body: "Promptly report suspected account compromise, unauthorized access, accidental disclosure, lost devices containing organization data, or other security incidents through LearnHub's published support channel.",
    },
    {
      title: "20. Report incidents without exposing secrets",
      body: "Share what happened, when it happened, and which accounts or information may be involved. Do not include passwords, one-time codes, access tokens, or full payment credentials in a report.",
    },
    {
      title: "21. Preserve relevant incident details",
      body: "Where safe and lawful, keep relevant timestamps, messages, or screenshots that help explain an incident. Avoid forwarding sensitive data broadly while investigating.",
    },
    {
      title: "22. Follow retention and deletion practices",
      body: "Keep information only as long as needed for a legitimate purpose, subject to applicable retention obligations. Submit correction or deletion requests through the appropriate LearnHub support process.",
    },
    {
      title: "23. Remove access when roles change",
      body: "When an administrator or instructor no longer needs access, remove or update their access promptly. Do not let former staff continue using organization accounts.",
    },
    {
      title: "24. Use third-party services carefully",
      body: "Review where information is being sent when using a linked third-party tool. Share only information needed for that function and follow the third party's relevant instructions and terms.",
    },
    {
      title: "25. Report suspected vulnerabilities responsibly",
      body: "Do not test or probe LearnHub systems without explicit authorization. If you notice a possible security weakness, stop testing and report it privately through LearnHub's published support channel.",
    },
    {
      title: "26. Understand security limitations",
      body: "No online service or user practice can eliminate every risk. Follow these precautions and any additional instructions LearnHub provides; this policy does not promise absolute security or a particular legal certification.",
    },
  ],
};

function OrganizationPolicyAcceptancePage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const isOrganizationAdmin =
    String(user?.role || "").toUpperCase() === "ADMIN" &&
    String(user?.adminType || "").toUpperCase() === "ORGANIZATION_ADMIN";
  const [activePolicy, setActivePolicy] = useState("terms");
  const [policyStatus, setPolicyStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isActive = true;

    getOrganizationPolicyStatus()
      .then((status) => {
        if (isActive) setPolicyStatus(status);
      })
      .catch((requestError) => {
        if (isActive) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Unable to load current policies."
          );
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [attempt]);

  const retryLoadingPolicies = () => {
    setError("");
    setIsLoading(true);
    setAttempt((value) => value + 1);
  };

  const handleAccept = async (event) => {
    event.preventDefault();
    if (!isOrganizationAdmin || !isChecked || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError("");
      setSuccess("");
      await acceptOrganizationPolicies();
      setSuccess("Policies accepted. Opening your organization dashboard…");
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/organization-admin-dashboard", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to record policy acceptance."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (policyStatus?.accepted) {
    return <Navigate to="/organization-admin-dashboard" replace />;
  }

  if (!isOrganizationAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <main
      className="min-h-screen bg-[#070707] px-4 py-8 text-white sm:px-6 lg:px-8"
      style={{ backgroundImage: "radial-gradient(ellipse at 10% 0%, rgba(14,165,233,0.12), transparent 34%), radial-gradient(ellipse at 90% 15%, rgba(168,85,247,0.1), transparent 32%), #070707" }}
    >
      <div className="mx-auto max-w-5xl">
        <section className="overflow-hidden rounded-[30px] border border-white/15 bg-gradient-to-br from-white/[0.07] via-[#111111]/95 to-[#09090b] shadow-[0_0_70px_rgba(56,189,248,0.07)] backdrop-blur-xl">
          <header className="border-b border-white/10 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-400/10 text-sky-200 shadow-[0_0_28px_rgba(56,189,248,0.12)]">
                <ShieldCheck size={23} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-sky-200/80">Organization admin access</p>
                <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Review LearnHub policies</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                  Before using organization features, read and accept the current Terms &amp; Conditions and Security &amp; Privacy Policy.
                </p>
              </div>
            </div>
          </header>

          <div className="p-4 sm:p-8">
            {isLoading ? (
              <div role="status" className="rounded-2xl border border-white/10 bg-black/20 p-8 text-center text-sm text-slate-300">
                Loading policy versions…
              </div>
            ) : error && !policyStatus ? (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-5">
                <p role="alert" className="text-sm text-red-200">{error}</p>
                <button
                  type="button"
                  onClick={retryLoadingPolicies}
                  className="mt-4 rounded-xl border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-black"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <div className="mb-5 flex flex-wrap gap-3" role="tablist" aria-label="LearnHub policies">
                  <button
                    id="terms-tab"
                    type="button"
                    role="tab"
                    aria-selected={activePolicy === "terms"}
                    aria-controls="policy-content"
                    onClick={() => setActivePolicy("terms")}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      activePolicy === "terms"
                        ? "border-sky-300/30 bg-sky-400/10 text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.08)]"
                        : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]"
                    }`}
                  >
                    <BookOpenCheck size={17} />
                    Terms &amp; Conditions <span className="text-xs opacity-70">v{policyStatus?.termsVersion}</span>
                  </button>
                  <button
                    id="security-tab"
                    type="button"
                    role="tab"
                    aria-selected={activePolicy === "security"}
                    aria-controls="policy-content"
                    onClick={() => setActivePolicy("security")}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      activePolicy === "security"
                        ? "border-violet-300/30 bg-violet-400/10 text-violet-100 shadow-[0_0_24px_rgba(167,139,250,0.08)]"
                        : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]"
                    }`}
                  >
                    <LockKeyhole size={17} />
                    Security &amp; Privacy <span className="text-xs opacity-70">v{policyStatus?.securityVersion}</span>
                  </button>
                </div>

                <div
                  id="policy-content"
                  role="tabpanel"
                  aria-labelledby={activePolicy === "terms" ? "terms-tab" : "security-tab"}
                  className="space-y-5 rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-7"
                >
                  <div>
                    <h2 className="text-xl font-semibold">
                      {activePolicy === "terms" ? "Terms & Conditions" : "Security & Privacy Policy"}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Current version {activePolicy === "terms" ? policyStatus?.termsVersion : policyStatus?.securityVersion}
                    </p>
                  </div>
                  {policySections[activePolicy].map((section) => (
                    <article key={section.title}>
                      <h3 className="font-semibold text-slate-100">{section.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{section.body}</p>
                    </article>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-400/[0.06] p-4 text-sm leading-6 text-amber-100/90">
                  <strong>Legal review required before production use:</strong> These plain-language policies are a product draft, not legal advice. Have qualified counsel review jurisdiction-specific terms, including payments, refunds, payouts, privacy, and dispute handling.
                </div>

                <form onSubmit={handleAccept} className="mt-6 border-t border-white/10 pt-5">
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-200">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(event) => setIsChecked(event.target.checked)}
                      disabled={isSubmitting || isLoading || !policyStatus}
                      className="mt-1 h-4 w-4 accent-sky-400"
                    />
                    <span>
                      I have read, understood, and agree to the LearnHub Terms &amp; Conditions and Security &amp; Privacy Policy, including their current versions.
                    </span>
                  </label>

                  {error ? <p role="alert" className="mt-4 text-sm text-red-300">{error}</p> : null}
                  {success ? <p role="status" className="mt-4 text-sm text-emerald-300">{success}</p> : null}

                  <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500">
                      Signed in as {user?.name || "organization administrator"}
                    </p>
                    {isOrganizationAdmin ? (
                      <button
                        type="submit"
                        disabled={!isChecked || isSubmitting || isLoading || !policyStatus}
                        className="rounded-xl border border-sky-200/30 bg-gradient-to-r from-sky-200 to-white px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_28px_rgba(56,189,248,0.14)] transition hover:shadow-[0_0_36px_rgba(56,189,248,0.22)] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {isSubmitting ? "Saving acceptance…" : "Accept & Continue"}
                      </button>
                    ) : null}
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default OrganizationPolicyAcceptancePage;
