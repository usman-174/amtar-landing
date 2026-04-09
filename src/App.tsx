import { Navigate, Route, Routes } from "react-router-dom"
import Home from "@/pages/Home"
import Contact from "@/pages/Contact"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
