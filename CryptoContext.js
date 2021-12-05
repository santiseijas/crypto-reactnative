import React, { createContext, useContext, useEffect, useState } from 'react'
const Crypto = createContext()

const CryptoContext = ({ children }) => {

    const [currency, setCurrency] = useState('USD')
    const [symbol, setSymbol] = useState('$')
    //const [icon,setIcon] =useState(FaDollarSign)
    
    useEffect(() => {
        if (currency === 'USD') {
            setSymbol('$')
            //setIcon(FaDollarSign)
        } else {
            setSymbol('€')
            //setIcon(FaEuroSign)
        }
    }, [currency])
    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency }}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto)
}
