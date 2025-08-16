import Editor from '@monaco-editor/react'

export function JsonEditor({value, onChange}:{value:string; onChange:(v:string)=>void}){
  return (
    <div className="h-[420px] border rounded-2xl overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="json"
        value={value}
        onChange={(v)=> onChange(v || '')}
        options={{ minimap:{enabled:false}, fontSize:14, tabSize:2 }}
      />
    </div>
  )
}
