export default function Dashboard(){
  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="border rounded-2xl p-4">
          <h2 className="font-semibold">내 캐릭터</h2>
          <p className="text-sm text-slate-600">아직 없음</p>
        </div>
        <div className="border rounded-2xl p-4">
          <h2 className="font-semibold">Fork한 캐릭터</h2>
          <p className="text-sm text-slate-600">아직 없음</p>
        </div>
      </div>
    </section>
  )
}
