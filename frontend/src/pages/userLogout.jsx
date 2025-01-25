import axios from "axios"
import { useNavigate } from 'react-router-dom'
const UserLogout = () => {

    const token = localStorage.getItem('token')

    const navigate = useNavigate();


    axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate('/user-login')
        }
    }).catch(err => {
        console.log(err)
    })

    return (
        <div>userLogout</div>
    )
}

export default UserLogout;