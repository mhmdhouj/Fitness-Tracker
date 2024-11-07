import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (email, password) => {
        setError(null);
        setIsLoading(true);

        const response = await fetch('api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        const json = await response.json();

        if (!response.ok){
            setError(json.error);
            setIsLoading(false);
        }

        if (response.ok){
            localStorage.setItem('user', JSON.stringify(json));
            setIsLoading(false);
            dispatch({type: 'LOGIN', payload: json});
        }
    }

    return {signup, error, isLoading};
}