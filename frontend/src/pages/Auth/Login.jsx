import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/Api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      setEmail(" ");
      setPassword(" ");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div>
      <section className="pl-[4rem] flex flex-wrap">
        <div className="ml-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                className="block text-sm font-medium text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="mt-1 p-2 border rounded w-full text-white bg-gray-800"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                className="block text-sm font-medium text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                className="mt-1 p-2 border rounded w-full text-white bg-gray-800"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 cursor-pointer text-white rounded px-4 py-2 my-[1rem]"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p className="text-white">
              New Customer ?{" "}
              <Link
                to={
                  redirect && redirect !== "/"
                    ? `/register?redirect=${redirect}`
                    : "/register"
                }
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
