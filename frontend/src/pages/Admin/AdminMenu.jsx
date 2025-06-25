import { useState } from "react";
import { NavLink } from "react-router";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <button
        onClick={toggleMenu}
        className={
          isMenuOpen
            ? "fixed top-2 right-2"
            : "fixed top-5 right-7 bg-[#151515] p-2 rounded-lg"
        }
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="h-0.5 w-5 bg-white my-1"></div>
            <div className="h-0.5 w-5 bg-white my-1"></div>
            <div className="h-0.5 w-5 bg-white my-1"></div>
          </>
        )}
      </button>
      {isMenuOpen && (
        <section className="bg-[#151515] p-4 fixed right-7 top-5">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2e2d2d] rounded-sm"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
                to="/admin/dashboard"
              >Admin Dashboard</NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2e2d2d] rounded-sm"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
                to="/admin/categorylist"
              >Create Category</NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2e2d2d] rounded-sm"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
                to="/admin/productlist"
              >Create Product</NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2e2d2d] rounded-sm"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
                to="/admin/allproducts"
              >All Products</NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2e2d2d] rounded-sm"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
                to="/admin/userslist"
              >Manage Users</NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2e2d2d] rounded-sm"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
                to="/admin/orderslist"
              >Manage Orders</NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
