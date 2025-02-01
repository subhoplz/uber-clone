import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const context = useContext(CaptainDataContext)
    const setCaptain = context?.setCaptain

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const captainData = { email, password }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

            if (response.status === 200) {
                const data = response.data
                if (setCaptain) {
                    setCaptain(data.captain)
                }
                localStorage.setItem('token', data.token)
                navigate('/captain-home')
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
                <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>Whats your email </h3>
                    <input required value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }}
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
                    <p className='text-center'>Register as captain<Link to="/captain-signup" className="text-blue-600"> Create new account</Link></p>
                </form>
            </div>
            <div>
                <Link to="/user-login" className="bg-[#e7790b] text-white
                flex items-center justify-center
                rounded px-4 py-2 border w-full text-lg font-semibold 
                 placeholder:text-base "
                    type="submit">Signup as user</Link>
            </div>
        </div>
    )
}
export default CaptainLogin