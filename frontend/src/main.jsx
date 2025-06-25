import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store.js";

// Private Route
import ProtectRoute from "./components/ProtectRoute.jsx";

// Imports for admin routes
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";

// Imports for admin for category routes
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";

// auth routes
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Profile from "./pages/User/Profile.jsx";

//Simple Pages
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx"
import Cart from "./pages/Cart.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Simple pages Routes */}
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="" element={<ProtectRoute />}>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userslist" element={<UserList />}></Route>
        <Route path="categorylist" element={<CategoryList />}></Route>
        <Route path="productlist" element={<ProductList />}></Route>
        <Route path="allproducts" element={<AllProducts />}></Route>
        <Route path="product/update/:_id" element={<UpdateProduct />}></Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
