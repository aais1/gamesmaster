import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import bg1 from "../assets/bg1.png";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../context/UserContext'; // Adjust the import path

export function Login() {
    const { setUser } = useUserContext(); // Get setUser from context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        setLoading(true);
        try {
            const resp = await fetch(import.meta.env.VITE_SERVER_URL + 'login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'no-cors', // Add this line
                body: JSON.stringify({ email, password }),
            });

            if (resp.status === 401) {
                navigate('/login');
                return;
            }

            const data = await resp.json();
            if (data.error) {
                throw new Error(data.error);
            }

            console.log(data)
            localStorage.setItem('user', JSON.stringify(data.user)); // Save user to local storage
            setUser(data.user); // Set user in context
            navigate('/');
        } catch (err) {
            toast.error(err.message || "An error occurred. Please try again.");
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    return (
      <div
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex items-center justify-center min-h-screen bg-gray-900"
      >
  
        <div className="flex flex-col items-center p-8 rounded-lg shadow-lg w-11/12 max-w-sm md:max-w-md">
          <img src="logo.png" alt="Logo" className="w-20 md:w-28 mb-6" />
          <h2 className="text-white text-2xl mb-4">Sign-in</h2>
  
          <form onSubmit={handleSubmit} className="w-full">
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 rounded-md border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
  
            <label className="sr-only" htmlFor="password">Password</label>
            <div className="relative mb-6">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12a9 9 0 0115-6.6M3 12a9 9 0 0015 6.6M3 12h18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.5 12c1.5-4.5 5.5-8 9.5-8 4 0 8 3.5 9.5 8-1.5 4.5-5.5 8-9.5 8-4 0-8-3.5-9.5-8z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 0010 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
  
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className={`flex items-center justify-center w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition duration-200 active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
              {loading ? 'Loading...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    );
}
