import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export const UserProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    if (!token) {
        navigate('/user-login')
    }

    return (
        <>
            {children}
        </>
    )
}

UserProtectWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};