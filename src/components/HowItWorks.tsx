import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Brain, CheckCircle, HandHelping } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const { tr } = useLanguage();

  const steps = [
    {
      icon: Phone,
      title: tr("connect"),
      desc: tr("connectDesc"),
      gradient: "from-orange-500 to-amber-500",
      glow: "shadow-[0_0_30px_hsl(28_100%_54%/0.25)]",
      border: "border-orange-500/20",
      number: "01",
    },
    {
      icon: Brain,
      title: tr("understand"),
      desc: tr("understandDesc"),
      gradient: "from-violet-500 to-purple-600",
      glow: "shadow-[0_0_30px_hsl(270_70%_55%/0.25)]",
      border: "border-violet-500/20",
      number: "02",
    },
    {
      icon: CheckCircle,
      title: tr("checkElig"),
      desc: tr("checkEligDesc"),
      gradient: "from-emerald-500 to-teal-500",
      glow: "shadow-[0_0_30px_hsl(150_55%_38%/0.25)]",
      border: "border-emerald-500/20",
      number: "03",
    },
    {
      icon: HandHelping,
      title: tr("getGuided"),
      desc: tr("getGuidedDesc"),
      gradient: "from-blue-500 to-cyan-500",
      glow: "shadow-[0_0_30px_hsl(210_100%_55%/0.25)]",
      border: "border-blue-500/20",
      number: "04",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[hsl(220_20%_5%)]" />
        <div className="absolute inset-y-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(220_15%_25%)] to-transparent top-0" />
        <div className="absolute inset-y-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(220_15%_25%)] to-transparent bottom-0" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-glass text-xs text-muted-foreground uppercase tracking-widest mb-4">
            Simple Process
          </span>
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-white mb-4">
            {tr("howItWorks")}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            From your first call to receiving benefits — we guide you every step of the way.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative glass-card rounded-2xl p-6 border ${step.border} ${step.glow} transition-all duration-300 group cursor-default`}
            >
              {/* Step number bg */}
              <div className="absolute top-4 right-4 font-['Space_Grotesk'] font-bold text-5xl text-white/[0.04] select-none leading-none">
                {step.number}
              </div>

              {/* Connector line (not last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[3.25rem] -right-[10px] w-5 h-px bg-gradient-to-r from-white/20 to-transparent z-10" />
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="h-6 w-6 text-white" />
              </div>

              {/* Step badge */}
              <div className="text-xs font-bold text-muted-foreground mb-2 tracking-widest uppercase">
                Step {i + 1}
              </div>

              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
