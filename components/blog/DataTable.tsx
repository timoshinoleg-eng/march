interface DataTableProps {
  headers?: string[];
  data: Array<{ label: string; value: string }> | string[][];
  highlightRow?: number;
}

export function DataTable({ headers, data, highlightRow }: DataTableProps) {
  const isSimpleData = Array.isArray(data) && data.length > 0 && 
    typeof data[0] === 'object' && 'label' in (data[0] as object);

  if (isSimpleData) {
    const simpleData = data as Array<{ label: string; value: string }>;
    return (
      <div className="overflow-hidden rounded-lg border border-gray-700">
        <table className="w-full">
          <tbody>
            {simpleData.map((row, index) => (
              <tr 
                key={index} 
                className={`${index !== simpleData.length - 1 ? 'border-b border-gray-700' : ''} ${
                  highlightRow === index ? 'bg-emerald-900/30' : index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'
                }`}
              >
                <td className="px-4 py-3 text-gray-300">{row.label}</td>
                <td className="px-4 py-3 text-right font-bold text-white">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const complexData = data as string[][];
  return (
    <div className="overflow-hidden rounded-lg border border-gray-700">
      <table className="w-full">
        {headers && (
          <thead className="bg-gray-700">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-gray-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {complexData.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={`${rowIndex !== complexData.length - 1 ? 'border-b border-gray-700' : ''} ${
                highlightRow === rowIndex ? 'bg-emerald-900/30' : rowIndex % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  className={`px-4 py-3 ${cellIndex === 0 ? 'font-medium text-white' : 'text-gray-300'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
