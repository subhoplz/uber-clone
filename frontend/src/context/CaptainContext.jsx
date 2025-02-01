import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

// Create the context with a default value
export const CaptainDataContext = createContext({
    captain: null,
    setCaptain: () => { }
})

export const CaptainContextProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null)

    const value = {
        captain,
        setCaptain
    }

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
}

CaptainContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default CaptainContextProvider