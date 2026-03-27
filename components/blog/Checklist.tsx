interface ChecklistProps {
  title: string;
  groups: Array<{
    title: string;
    items: string[];
  }>;
}

export function Checklist({ title, groups }: ChecklistProps) {
  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold mb-6 text-white">{title}</h3>
      
      <div className="space-y-6">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold mb-4 text-gray-200">{group.title}</h4>
            
            <div className="space-y-3">
              {group.items.map((item, itemIndex) => (
                <label 
                  key={itemIndex} 
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-700 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                </label>
              ))}
            </div>          
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-emerald-900/50 rounded-lg border border-emerald-700/50">
        <p className="text-emerald-200 font-medium text-center">
          Если вы ответили «да» на вопросы 2 и 4 — у вас высокий потенциал для автоматизации.
        </p>
      </div>
    </div>
  );
}

export default Checklist;
