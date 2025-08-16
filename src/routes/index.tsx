import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Explore from '@/pages/Explore'
import Character from '@/pages/Character'
import Commit from '@/pages/Commit'
import Verify from '@/pages/Verify'
import Create from '@/pages/Create'
import Dashboard from '@/pages/Dashboard'
import About from '@/pages/About'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/explore" element={<Explore />} />
    <Route path="/character/:id" element={<Character />} />
    <Route path="/commit/:id" element={<Commit />} />
    <Route path="/verify/:id" element={<Verify />} />
    <Route path="/create" element={<Create />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/about" element={<About />} />
  </Routes>
)
