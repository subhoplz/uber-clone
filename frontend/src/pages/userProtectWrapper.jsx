import { useNavigate } from 'react-router-dom'
import propTypes from 'prop-types'
import { useEffect } from 'react'

export const UserProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/user-login')
        }
    }, [token, navigate])

    return (
        <>
            {children}
        </>
    )
}

UserProtectWrapper.propTypes = {
    children: propTypes.node.isRequired,
}

export default UserProtectWrapper