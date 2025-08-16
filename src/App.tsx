import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { AppRoutes } from '@/routes'
import { useState } from 'react'

export default function App() {
  const [open, setOpen] = useState(true)
  return (
    <div className="min-h-screen flex">
      <Sidebar open={open} onToggle={() => setOpen(o => !o)} />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <AppRoutes />
        </main>
      </div>
    </div>
  )
}
