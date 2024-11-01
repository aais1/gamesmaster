import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from '../context/UserContext'; // Adjust the import path

/* eslint-disable react/prop-types */
export function Protected({ children }) {
    const { user } = useUserContext(); // Get user from context
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user exists in context
        if (!user && !JSON.parse(localStorage.getItem('user')) ) {
            toast.error("You need to log in first.");
            navigate('/login');
        } else {
            setLoading(false); // User is authenticated, stop loading
        }
    }, [user, navigate]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return <div>{children}</div>;
}

export default Protected;
