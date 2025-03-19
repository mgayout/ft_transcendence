import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser } from './api';

const UserAuthContext = createContext(null)

export const useAuth = () => {
    return useContext(UserAuth)
}

export const UserAuth = ({ children }) => {

	const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(null)
	const publicPath = ["/", "/register"]

    const jwt = localStorage.getItem("jwt");
    useEffect(() => {

        if (publicPath.includes(location.pathname) && jwt)
            navigate("/home")
        else if (publicPath.includes(location.pathname))
            return

        if (!jwt) {
            navigate('/')
            return
        }

        const defineUser = async () => {

            try {
                const userTmp = await getUser()
                setUser(userTmp)
            }
			catch (error) {
                localStorage.removeItem("jwt")
                navigate('/')
            }
        }

        if (jwt)
            defineUser()
    }, [navigate, location.pathname, jwt])

    useEffect(() => {
        const updateUser = async () => {
            if (jwt) {
                try {
                    const updatedUser = await getUser()
                    setUser(updatedUser)
                }
				catch (error) {
                    console.error(error)
                }
            }
        }
        updateUser()
    }, [])

    return (
        <UserAuthContext.Provider value={{ user, setUser }}>
            {children}
        </UserAuthContext.Provider>
    )
}