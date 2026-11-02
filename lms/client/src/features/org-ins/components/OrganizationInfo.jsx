import {
  Building2,
  UserRound,
  Mail,
  CalendarDays,
} from "lucide-react";

export default function OrganizationInfo({ organization }) {
  if (!organization) return null;

  const ownerName =
    organization.owner?.name || "Organization Admin";

  const ownerEmail = organization.owner?.email || "Not available";

  const organizationType =
    organization.organizationType || "Not specified";

  const createdDate = organization.createdAt
    ? new Date(organization.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "Not available";

  const details = [
    {
      label: "Organization Type",
      value: organizationType,
      icon: Building2,
    },
    {
      label: "Organization Owner",
      value: ownerName,
      icon: UserRound,
    },
    {
      label: "Owner Email",
      value: ownerEmail,
      icon: Mail,
    },
    {
      label: "Established",
      value: createdDate,
      icon: CalendarDays,
    },
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-black p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Organization details
        </h2>

        <p className="mt-1 text-sm text-white/40">
          Information about your organization.
        </p>
      </div>

      {organization.description && (
        <p className="mb-7 max-w-3xl text-sm leading-relaxed text-white/50">
          {organization.description}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {details.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/70">
              <Icon size={17} />
            </div>

            <p className="text-xs text-white/40">{label}</p>

            <p className="mt-2 break-words text-sm font-medium text-white">
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}