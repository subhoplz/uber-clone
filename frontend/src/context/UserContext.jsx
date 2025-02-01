import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context with a default value
export const UserDataContext = createContext({
    user: null,
    setUser: () => { }
});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const value = {
        user,
        setUser
    };

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default UserContextProvider;