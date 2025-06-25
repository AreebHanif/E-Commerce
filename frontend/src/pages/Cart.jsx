import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addtoCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    navigate("/cart");
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty{" "}
            <Link to={"/shop"} className="text-blue-700">
              Go Back
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[85%]">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
              {cartItems.map((item) => (
                <div
                  className="flex items-center mb-[1rem] pb-2"
                  key={item._id}
                >
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-500">
                      {item.name}
                    </Link>
                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      $ {item.price}
                    </div>
                  </div>
                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-white bg-black"
                      value={item.qty}
                      onChange={(e) =>
                        addtoCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(Number(item.countInStock)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={(e) => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[0.5rem]" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                    Items )
                  </h2>
                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>
                  {cartItems.length > 0 && (
                    <button
                      disabled={cartItems.length === 0}
                      className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-[270px]"
                      onClick={checkOutHandler}
                    >
                      Procees to checkout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
