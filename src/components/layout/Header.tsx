import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="sticky top-0 bg-white/70 backdrop-blur border-b z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl text-brand-700">SoulHub</Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/explore" className="hover:text-brand-600">Explore</Link>
          <Link to="/create" className="hover:text-brand-600">Create</Link>
          <Link to="/dashboard" className="hover:text-brand-600">Dashboard</Link>
          <Link to="/about" className="hover:text-brand-600">About</Link>
        </nav>
      </div>
    </header>
  )
}
