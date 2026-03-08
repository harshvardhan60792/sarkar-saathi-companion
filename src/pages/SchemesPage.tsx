import AIAssistant from "@/components/AIAssistant";
import { useLanguage } from "@/contexts/LanguageContext";

const SchemesPage = () => {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <AIAssistant key={lang} />
    </div>
  );
};

export default SchemesPage;
