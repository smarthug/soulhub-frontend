export default function Verify(){
  return (
    <section className="max-w-3xl mx_auto">
      <h1 className="text-2xl font-bold">Verify</h1>
      <p className="text-slate-600 mt-2">캐릭터 JSON의 안전성 분석 결과를 표시합니다.</p>
      <ul className="mt-4 list-disc pl-5 text-sm space-y-1">
        <li>공포</li>
        <li>폭력성</li>
        <li>선정성</li>
        <li>언어의 부적절성</li>
        <li>약물</li>
        <li>범죄</li>
        <li>사행성</li>
      </ul>
    </section>
  )
}
