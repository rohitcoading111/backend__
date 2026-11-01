import {
  Users,
  Building2,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

function AdminStats({ users = [] }) {
  const isSuspended = (user) => {
    const organization =
      user.organizationId &&
      typeof user.organizationId === "object"
        ? user.organizationId
        : null;

    return (
      user.adminStatus === "SUSPENDED" ||
      organization?.status === "SUSPENDED"
    );
  };

  const totalAdmins = users.length;

  const suspendedAdmins = users.filter(isSuspended).length;

  const setupRequired = users.filter(
    (user) => !user.organizationId
  ).length;

  const activeOrganizations = users.filter(
    (user) =>
      Boolean(user.organizationId) &&
      !isSuspended(user)
  ).length;

  const stats = [
    {
      title: "Total Admin Accounts",
      value: totalAdmins,
      description: "Registered organization admins",
      icon: Users,
      iconStyle: "bg-indigo-50 text-indigo-600",
      accent: "bg-indigo-500",
    },
    {
      title: "Active Organizations",
      value: activeOrganizations,
      description: "Linked, active organization accounts",
      icon: Building2,
      iconStyle: "bg-emerald-50 text-emerald-600",
      accent: "bg-emerald-500",
    },
    {
      title: "Suspended Accounts",
      value: suspendedAdmins,
      description: "Administrators currently suspended",
      icon: ShieldAlert,
      iconStyle: "bg-red-50 text-red-600",
      accent: "bg-red-500",
    },
    {
      title: "Setup Required",
      value: setupRequired,
      description: "Accounts without linked organizations",
      icon: ShieldCheck,
      iconStyle: "bg-amber-50 text-amber-600",
      accent: "bg-amber-500",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/[0.05] sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconStyle}`}
              >
                <Icon size={22} />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              {stat.description}
            </p>

            <div
              className={`absolute bottom-0 left-0 h-1 w-full ${stat.accent} opacity-70`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default AdminStats;