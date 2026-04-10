import { Navigate, Route, Routes } from "react-router-dom"
import Home from "@/pages/Home"
import Contact from "@/pages/Contact"
import { ScrollToTopButton } from "@/components/ScrollToTopButton"

/** App shell: `/` renders `Home` (hero V2 carousel + scroll gallery + landing sections). */
export default function App() {
  return (
    <>
      <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
