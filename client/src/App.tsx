import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import AdminPage from "./pages/AdminPage"
import AddProductPage from "./pages/AddProductPage"
import { PrivateRoutes,AdminPrivateRoutes } from "./components/PrivateRoutes"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />   

            <Route element={<PrivateRoutes />} >

            </Route>         

            <Route path="admin" element={<AdminPrivateRoutes />} >
              <Route index element={<AdminPage />} />
              <Route path="add" element={<AddProductPage />} />
            </Route>
          </Route>  
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
