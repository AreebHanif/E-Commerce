import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router";
import { useProfileMutation } from "../../redux/Api/usersApiSlice";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
        toast.error("Password do not match.")
    }else{
        try {
            const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success("Profile Updated Successfully.")
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }
  }

  return (
    <div className="container mx-auto p-4 mt-[5rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}> 
            <div className="mb-4">
              <label htmlFor="username" className="block text-white mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter Name"
                className="form-input rounded-sm p-4 w-full bg-gray-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email"
                className="form-input rounded-sm p-4 w-full bg-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                className="form-input rounded-sm p-4 w-full bg-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-white mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="form-input rounded-sm p-4 w-full bg-gray-600"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>
              <Link to={"/user-order"} className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700">My Orders</Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
}

export default Profile;
