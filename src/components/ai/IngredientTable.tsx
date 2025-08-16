type Row = { type: 'dataset'|'model'|'prompt'; source: string; license?: string }
export function IngredientTable({ rows }: { rows: Row[] }){
  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="text-left p-3">Type</th>
            <th className="text-left p-3">Source</th>
            <th className="text-left p-3">License</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=> (
            <tr key={i} className="border-t">
              <td className="p-3">{r.type}</td>
              <td className="p-3">{r.source}</td>
              <td className="p-3">{r.license ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
