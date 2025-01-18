import PropTypes from 'prop-types';
// import { UserDataContext } from './UserDataContext';
import { useState, createContext } from 'react';


export const UserDataContext = createContext();
const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        fullname: {
            firstname: '',
            lastname: ''
        }
    });

    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
};

UserContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;