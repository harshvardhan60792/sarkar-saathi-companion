import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schemes, categories } from "@/data/schemes";
import { Search, ChevronRight, Sparkles, Filter } from "lucide-react";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const categoryColors: Record<string, { from: string; text: string; border: string; badge: string }> = {
  Agriculture: { from: "from-lime-500 to-green-600", text: "text-lime-400", border: "border-lime-500/20", badge: "bg-lime-500/10 text-lime-400" },
  Health: { from: "from-red-500 to-pink-600", text: "text-red-400", border: "border-red-500/20", badge: "bg-red-500/10 text-red-400" },
  Employment: { from: "from-blue-500 to-cyan-600", text: "text-blue-400", border: "border-blue-500/20", badge: "bg-blue-500/10 text-blue-400" },
  Housing: { from: "from-amber-500 to-orange-600", text: "text-amber-400", border: "border-amber-500/20", badge: "bg-amber-500/10 text-amber-400" },
  Welfare: { from: "from-purple-500 to-violet-600", text: "text-purple-400", border: "border-purple-500/20", badge: "bg-purple-500/10 text-purple-400" },
  Business: { from: "from-cyan-500 to-teal-600", text: "text-cyan-400", border: "border-cyan-500/20", badge: "bg-cyan-500/10 text-cyan-400" },
  "Women & Child": { from: "from-pink-500 to-rose-600", text: "text-pink-400", border: "border-pink-500/20", badge: "bg-pink-500/10 text-pink-400" },
  Education: { from: "from-indigo-500 to-violet-600", text: "text-indigo-400", border: "border-indigo-500/20", badge: "bg-indigo-500/10 text-indigo-400" },
  Financial: { from: "from-yellow-500 to-amber-600", text: "text-yellow-400", border: "border-yellow-500/20", badge: "bg-yellow-500/10 text-yellow-400" },
};

const getColor = (cat: string) =>
  categoryColors[cat] || { from: "from-gray-500 to-slate-600", text: "text-gray-400", border: "border-gray-500/20", badge: "bg-gray-500/10 text-gray-400" };

const SchemeCard = ({ scheme, index }: { scheme: typeof schemes[0]; index: number }) => {
  const { lang, tr } = useLanguage();
  const isHi = lang === "hi";
  const IconComp = (Icons as any)[scheme.icon] || Icons.FileText;
  const colors = getColor(scheme.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`glass-card rounded-2xl p-5 border ${colors.border} hover:shadow-[0_8px_40px_hsl(0_0%_0%/0.4)] group transition-all duration-300 flex flex-col`}
    >
      {/* Icon + category */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colors.from} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <IconComp className="h-5 w-5 text-white" />
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
          {scheme.category}
        </span>
      </div>

      {/* Title + Ministry */}
      <h3 className="font-['Space_Grotesk'] font-bold text-white text-base mb-0.5 leading-tight">
        {isHi ? scheme.nameHi : scheme.name}
      </h3>
      <p className={`text-xs font-medium mb-3 ${colors.text}`}>
        {isHi ? scheme.ministryHi : scheme.ministry}
      </p>

      {/* Benefit highlight */}
      <div className={`bg-gradient-to-r ${colors.from} p-px rounded-xl mb-3`}>
        <div className="bg-[hsl(220_20%_10%)] rounded-[11px] px-3 py-2">
          <p className={`text-sm font-semibold ${colors.text}`}>
            {isHi ? scheme.benefitHi : scheme.benefit}
          </p>
        </div>
      </div>

      {/* Eligibility */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
        {isHi ? scheme.eligibilityHi : scheme.eligibility}
      </p>

      {/* CTA */}
      <Link
        to={`/assistant?scheme=${scheme.id}`}
        className={`group/link inline-flex items-center gap-1.5 text-sm font-semibold ${colors.text} hover:gap-2.5 transition-all duration-200`}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {tr("checkEligibility")}
        <ChevronRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

const SchemeExplorer = () => {
  const { tr } = useLanguage();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("");

  const filtered = schemes.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.nameHi.includes(search);
    const matchCat = !cat || s.category === cat;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen py-12 md:py-16">
      {/* Page header */}
      <div className="container max-w-7xl mx-auto px-4 md:px-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-6 rounded-full gradient-brand" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Browse</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl font-bold text-white mb-2">
            {tr("schemes")}
          </h2>
          <p className="text-muted-foreground">Find the right government scheme for you.</p>
        </motion.div>
      </div>

      {/* Search + Filters */}
      <div className="container max-w-7xl mx-auto px-4 md:px-6 mb-8">
        <div className="flex flex-col gap-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              id="scheme-search"
              placeholder={tr("searchSchemes")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass border border-glass text-white placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(28_100%_54%/0.5)] focus:shadow-brand transition-all duration-200 text-base"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap items-center">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
              <Filter className="h-3.5 w-3.5" />
              Filter:
            </div>
            <button
              onClick={() => setCat("")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${!cat
                  ? "gradient-brand text-white shadow-brand"
                  : "glass border border-glass text-muted-foreground hover:text-white hover:border-white/20"
                }`}
            >
              {tr("allCategories")}
            </button>
            {categories.map((c) => {
              const colors = getColor(c);
              return (
                <button
                  key={c}
                  onClick={() => setCat(c === cat ? "" : c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${cat === c
                      ? `${colors.badge} border ${colors.border}`
                      : "glass border border-glass text-muted-foreground hover:text-white hover:border-white/20"
                    }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="container max-w-7xl mx-auto px-4 md:px-6 mb-5">
        <p className="text-xs text-muted-foreground">
          Showing <span className="text-white font-semibold">{filtered.length}</span> schemes
          {cat && <span> in <span className={`font-semibold ${getColor(cat).text}`}>{cat}</span></span>}
          {search && <span> matching "<span className="text-white font-semibold">{search}</span>"</span>}
        </p>
      </div>

      {/* Cards grid */}
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
            >
              {filtered.map((s, i) => (
                <SchemeCard key={s.id} scheme={s} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 glass-card rounded-2xl border border-glass"
            >
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
              <p className="text-white font-semibold mb-1">No schemes found</p>
              <p className="text-sm text-muted-foreground">Try a different search term or category</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SchemeExplorer;
