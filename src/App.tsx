import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import DayPage from './pages/DayPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CertificatePage from './pages/CertificatePage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/day/:dayId" element={<DayPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/certificate" element={<CertificatePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
