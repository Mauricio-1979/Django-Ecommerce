import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import AdminPage from "./pages/AdminPage"
import AddProductPage from "./pages/AddProductPage"
import { PrivateRoutes, AdminPrivateRoutes } from "./components/PrivateRoutes"
import EditProductPage from "./pages/EditProductPage"
import SoloProduct from "./pages/SoloProduct"
import CategoryPage from "./pages/CategoryPage"
import SearchByCate from "./pages/SearchByCategory"
import CartPage from "./pages/CartPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="product/:slug" element={<SoloProduct />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="categories/:cate" element={<SearchByCate />} />

            <Route element={<PrivateRoutes />} >
              <Route path="cart" element={<CartPage />} />
            </Route>

            <Route path="admin" element={<AdminPrivateRoutes />} >
              <Route index element={<AdminPage />} />
              <Route path="add" element={<AddProductPage />} />
              <Route path="edit/:id" element={<EditProductPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
