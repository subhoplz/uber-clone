import { createContext, useState, } from 'react';
import PropTypes from 'prop-types';

const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [captainLocation, setCaptainLocation] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const [currentRide, setCurrentRide] = useState(null);

    const updateCaptainLocation = (location) => {
        setCaptainLocation(location);
    };

    const toggleOnlineStatus = () => {
        setIsOnline(!isOnline);
    };

    const acceptRide = (ride) => {
        setCurrentRide(ride);
    };

    const completeRide = () => {
        setCurrentRide(null);
    };
    const value = {
        captain,
        setCaptain,
        captainLocation,
        updateCaptainLocation,
        isOnline,
        toggleOnlineStatus,
        currentRide,
        acceptRide,
        completeRide,
    }

    console.log("Captain Context Value:", value);

    return (
        <CaptainDataContext.Provider
            value={value}
        >
            {children}
        </CaptainDataContext.Provider>
    );
};

CaptainContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CaptainDataContext;