import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/user-login');
                }
            }).catch((error) => {
                console.error("Logout failed:", error.response ? error.response.data : error.message);
                // Optionally, you can display an error message to the user here
            });
        } else {
            navigate('/user-login');
        }
    }, [navigate]);

    return (
        <div>
            Logging out...
        </div>
    );
}

export default UserLogout;