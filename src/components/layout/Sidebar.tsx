import { Link, useLocation } from 'react-router-dom'

export function Sidebar({ open, onToggle }:{ open:boolean; onToggle:()=>void }) {
  const { pathname } = useLocation()
  return (
    <aside className={`transition-all duration-300 bg-white border-r ${open? 'w-56':'w-14'}`}>
      <div className="h-14 flex items-center justify-between px-3 border-b">
        <button onClick={onToggle} aria-label="toggle" className="text-slate-600">☰</button>
        {open && <div className="text-xs text-slate-500">v0.1</div>}
      </div>
      <nav className="p-2 text-sm">
        {[
          ['/', 'Home'],
          ['/explore','Explore'],
          ['/create','Create'],
          ['/dashboard','Dashboard'],
        ].map(([to,label])=> (
          <Link key={to} to={to} className={`block px-3 py-2 rounded-md hover:bg-slate-100 ${pathname===to? 'bg-slate-100 font-medium':''}`}>
            {open? label: label[0]}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
