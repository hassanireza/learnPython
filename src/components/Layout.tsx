import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import './Layout.css'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="layout">
      <Navbar onMenuClick={() => setMenuOpen((v) => !v)} />
      <div className="layout__body">
        <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />
        {menuOpen && <div className="layout__overlay" onClick={() => setMenuOpen(false)} />}
        <main className="layout__content">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  )
}
