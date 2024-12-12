/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TUserJwtPayload } from "@/interfaces";
import { setUser } from "@/redux/api/slices/authSlice";
import { useLoginMutation } from "@/redux/api/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { saveUserInfo } from "@/services/authServices";
import { decodedToken } from "@/utils/jwt";
import { Link } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(loginData).unwrap();
      const accessToken = response?.token;

      if (accessToken) {
        saveUserInfo({ accessToken });
        const user = decodedToken(accessToken) as TUserJwtPayload;
        dispatch(setUser({ user: user, token: accessToken }));
        navigate(`/dashboard/${user?.role}`);
      }
    } catch (error: any) {
      setLoginError(error?.data?.message || "Login failed. Please try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
  bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">
          日本語学習プラットフォーム
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and password to login
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="youremail@example.com"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          {loginError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{loginError}</span>
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-500 font-semibold"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
