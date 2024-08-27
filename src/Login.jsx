import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useAxiosPublic from "./Hooks/useAxiosPublic";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const HandleLogin = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then((result) => {
        const userLastLoinTime = {
          lastSignInTime: result.user?.metadata?.lastSignInTime,
          lastLoginAt: result.user?.metadata?.lastLoginAt,
        };

        axiosPublic
          .put(`/users/${result.user?.email}`, userLastLoinTime)
          .then(() => {});

        toast.success("Login successful. Please Wait for Redirect", {
          autoClose: 1500,
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate(location?.state ? location.state : "/");
        }, 1500);
      })
      .catch(() => {
        toast.error("Login failed. Please check your Email and Password.");
      });
  };

  const HandleGoogle = () => {
    googleLogin().then(async (result) => {
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photoUrl: result.user?.photoURL,
        role: "member",
      };
      await axiosPublic.post("/users", userInfo).then(() => {});

      const userLastLoinTime = {
        lastSignInTime: result.user?.metadata?.lastSignInTime,
        lastLoginAt: result.user?.metadata?.lastLoginAt,
      };

      await axiosPublic
        .put(`/users/${result.user?.email}`, userLastLoinTime)
        .then(() => {});

      toast.success("Login successful. Please Wait for Redirect", {
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate(location?.state ? location.state : "/");
      }, 1500);
    });
  };

  return (
    <>
      <Helmet>
        <title>Login | Fit N Flex Arena</title>
      </Helmet>
      <div className="hero p-5 md:p-20">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-amber-500">Login now!</h1>
            <p className="py-6 text-amber-700">
              Securely access your account. Log in now for streamlined
              navigation and personalized services.
            </p>
          </div>
          <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl shadow-amber-100">
            <form onSubmit={HandleLogin} className="card-body pb-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <p className="mt-4">
                    New to this website? Please
                    <Link
                      className="btn-link font-semibold text-amber-500"
                      to="/register"
                    >
                      Register
                    </Link>
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-outline border-2 border-amber-500 bg-transparent text-xl text-amber-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="loading loading-spinner loading-sm mr-2"></span>
                      Loading...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
            <p className="mb-2 text-center text-lg font-semibold">
              Or Login With!
            </p>
            <div className="mb-4 flex w-full flex-row justify-center">
              <button
                onClick={HandleGoogle}
                className="btn btn-outline text-amber-500 hover:border-amber-500 hover:bg-amber-500"
              >
                <FaGoogle />
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Login;
