interface CaseStudyProps {
  variant: "success" | "warning";
  title: string;
  date: string;
  company: string;
  problem: string;
  solution: string;
  result: string[];
  why: string;
}

export function CaseStudy({ 
  variant, 
  title, 
  date, 
  company, 
  problem, 
  solution, 
  result, 
  why 
}: CaseStudyProps) {
  const isSuccess = variant === "success";
  
  return (
    <div className={`rounded-xl border-l-4 p-6 ${
      isSuccess ? "border-emerald-500 bg-emerald-900/20" : "border-amber-500 bg-amber-900/20"
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          isSuccess ? "bg-emerald-900/50 text-emerald-300" : "bg-amber-900/50 text-amber-300"
        }`}>
          {isSuccess ? "✓ Успех" : "⚠ Уроки"}
        </span>
        <span className="text-sm text-gray-400">{date}</span>
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-4 font-medium">{company}</p>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Проблема</h4>
          <p className="text-gray-300">{problem}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {isSuccess ? "Решение" : "Ожидания"}
          </h4>
          <p className="text-gray-300">{solution}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {isSuccess ? "Результат" : "Реальность"}
          </h4>
          <ul className="space-y-2">
            {result.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={isSuccess ? "text-emerald-400" : "text-amber-400"}>•</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={`pt-4 border-t ${isSuccess ? "border-emerald-700/50" : "border-amber-700/50"}`}>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {isSuccess ? "Почему сработало" : "Что пошло не так"}
          </h4>
          <p className={`text-sm ${isSuccess ? "text-emerald-300" : "text-amber-300"}`}>{why}</p>
        </div>
      </div>
    </div>
  );
}

export default CaseStudy;
