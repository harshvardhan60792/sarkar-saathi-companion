import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, Clock, AlertTriangle, MessageSquare, FileText, Bell, TrendingUp, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const mockApplications = [
  { id: "SS-2024-78432", scheme: "PM-KISAN", schemeHi: "पीएम-किसान", status: "approved", date: "Dec 15, 2024" },
  { id: "SS-2024-78455", scheme: "Ayushman Bharat", schemeHi: "आयुष्मान भारत", status: "pending", date: "Dec 20, 2024" },
  { id: "SS-2024-78490", scheme: "PM Awas Yojana", schemeHi: "पीएम आवास योजना", status: "review", date: "Jan 05, 2025" },
];

const mockSmsLog = [
  {
    date: "Dec 15, 2024",
    msg: "Your PM-KISAN application SS-2024-78432 has been APPROVED. ₹2,000 will be credited to your account.",
    msgHi: "आपका पीएम-किसान आवेदन SS-2024-78432 स्वीकृत। ₹2,000 आपके खाते में जमा होगा।",
    type: "success",
  },
  {
    date: "Dec 20, 2024",
    msg: "Application SS-2024-78455 for Ayushman Bharat received. Verification in progress.",
    msgHi: "आयुष्मान भारत के लिए आवेदन SS-2024-78455 प्राप्त। सत्यापन जारी।",
    type: "info",
  },
  {
    date: "Jan 05, 2025",
    msg: "PM Awas Yojana application under review. Documents verified successfully.",
    msgHi: "पीएम आवास योजना आवेदन समीक्षाधीन। दस्तावेज़ सत्यापित।",
    type: "warning",
  },
];

const statusConfig: Record<string, { icon: typeof CheckCircle2; label: string; labelHi: string; bg: string; text: string; dot: string }> = {
  approved: { icon: CheckCircle2, label: "Approved", labelHi: "स्वीकृत", bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400" },
  pending: { icon: Clock, label: "Pending", labelHi: "लंबित", bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-400" },
  review: { icon: AlertTriangle, label: "Under Review", labelHi: "समीक्षाधीन", bg: "bg-blue-500/15", text: "text-blue-400", dot: "bg-blue-400" },
};

const smsTypeColors: Record<string, { border: string; icon: string }> = {
  success: { border: "border-l-emerald-500", icon: "text-emerald-400" },
  info: { border: "border-l-blue-500", icon: "text-blue-400" },
  warning: { border: "border-l-amber-500", icon: "text-amber-400" },
};

const DashboardView = () => {
  const { lang, tr } = useLanguage();
  const isHi = lang === "hi";

  const summaryStats = [
    { label: "Total Applied", value: "3", icon: FileText, gradient: "from-orange-500 to-amber-500" },
    { label: "Approved", value: "1", icon: CheckCircle2, gradient: "from-emerald-500 to-teal-500" },
    { label: "In Progress", value: "2", icon: TrendingUp, gradient: "from-blue-500 to-violet-500" },
  ];

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container max-w-5xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-6 rounded-full gradient-brand" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Your Profile</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl font-bold text-white">{tr("dashboard")}</h2>
          <p className="text-muted-foreground mt-1">Track your applications and stay updated.</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {summaryStats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="glass-card rounded-2xl p-4 md:p-5 border border-glass text-center"
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mx-auto mb-3`}>
                <s.icon className="h-4.5 w-4.5 text-white h-5 w-5" />
              </div>
              <div className="font-['Space_Grotesk'] text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-6 md:grid-cols-5">
          {/* Applications — wider */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-[hsl(28,100%,64%)]" />
                {isHi ? "मेरे आवेदन" : "My Applications"}
              </h3>
              <span className="text-xs text-muted-foreground glass px-2 py-1 rounded-full border border-glass">
                {mockApplications.length} total
              </span>
            </div>
            <div className="space-y-3">
              {mockApplications.map((app, i) => {
                const sc = statusConfig[app.status];
                const Icon = sc.icon;
                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="glass-card rounded-2xl p-4 border border-glass flex items-center justify-between gap-4 group cursor-pointer hover:border-[hsl(28_100%_54%/0.2)] transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-2 h-8 rounded-full ${sc.dot}`} />
                      <div className="min-w-0">
                        <p className="font-semibold text-white text-sm truncate">
                          {isHi ? app.schemeHi : app.scheme}
                        </p>
                        <p className="text-xs text-muted-foreground">{app.id} · {app.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                        <Icon className="h-3 w-3" />
                        {isHi ? sc.labelHi : sc.label}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* SMS Log — narrower */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-[hsl(28,100%,64%)]" />
                {isHi ? "सूचनाएं" : "Notifications"}
              </h3>
            </div>
            <div className="space-y-3">
              {mockSmsLog.map((sms, i) => {
                const colors = smsTypeColors[sms.type];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`glass-card rounded-2xl p-4 border border-glass border-l-4 ${colors.border}`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <MessageSquare className={`h-3.5 w-3.5 shrink-0 ${colors.icon}`} />
                      <p className="text-xs text-muted-foreground">{sms.date}</p>
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">
                      {isHi ? sms.msgHi : sms.msg}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
