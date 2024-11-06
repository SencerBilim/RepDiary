import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("https://repdiary.onrender.com/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json(); 
            if (!response.ok) {
                
                setIsLoading(false);
                setError(json.error || "Something went wrong.");
                return;
            }


            localStorage.setItem("user", JSON.stringify(json));

            
            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        } catch (err) {
            
            setIsLoading(false);
            setError("Failed to connect to the server. Please try again.");
        }
    };

    return { login, isLoading, error };
};
