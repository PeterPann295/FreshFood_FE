import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RefreshToken from './RefreshToken'; // Import your function here

const TestRefreshToken = () => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate(); // Get the navigate function inside the component

    useEffect(() => {
        const testRefresh = async () => {
            const newToken = await RefreshToken(navigate); // Pass navigate to the function
            setToken(newToken);
        };
        testRefresh();
    }, [navigate]);

    if (!token) {
        return <div>Refreshing token...</div>;
    }

    return (
        <div>
            <h1>Token refreshed successfully!</h1>
            <p>New Access Token: {token}</p>
        </div>
    );
};

export default TestRefreshToken;
