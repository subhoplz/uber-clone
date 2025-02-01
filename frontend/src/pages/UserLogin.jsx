import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'


const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [userData, setUserData] = useState({})

    const context = useContext(UserDataContext)
    const setUser = context?.setUser
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const userData = { email, password }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

            if (response.status === 200) {
                const data = response.data
                if (setUser) {
                    setUser(data.user)
                }
                localStorage.setItem('token', data.token)
                navigate('/home')
            }
        } catch (error) {
            console.error('Login error:', error)
        }

        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className="w-16 m-3 " src="/src/assets/uber.png" alt="" />
                <form onSubmit={submitHandler}>
                    <h3 className='text-lg font-medium mb-2'>Whats your email</h3>
                    <input required value={email} onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-7 
                rounded px-4 py-2 border w-full
                 placeholder:text-base' type="email"
                        placeholder="email@example.com" />
                    <h3 className='text-lg font-medium mb-2'>Enter password</h3>
                    <input required value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className="bg-[#eeeeee] mb-7
                rounded px-4 py-2 border w-full
                 placeholder:text-base" type="password"
                        placeholder="password" />
                    <button className="bg-[#111] text-white
                rounded px-4 py-2 border w-full text-lg font-semibold mb-3 
                 placeholder:text-base "
                        type="submit">Login</button>
                    <p className='text-center'>New to uber?<Link to="/user-Signup" className="text-blue-600"> Create new account</Link></p>
                </form>
            </div>
            <div>
                <Link to="/captain-login" className="bg-[#75d259] text-white
                flex items-center justify-center
                rounded px-4 py-2 border w-full text-lg font-semibold 
                 placeholder:text-base "
                    type="submit">Signup as captain</Link>
            </div>
        </div>
    )
}
export default UserLogin