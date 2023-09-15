import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [operadores, setOperadores] = useState([])

    async function getUsers() {
        try {
            const res = await axios.get(
                process.env.NODE_ENV === "development" ? `${import.meta.env.VITE_MYLOCALHOST}:3000/api/user` : "https://api-curso-project.vercel.app/api/user"
            );
            // const resFiltered = res.data.filter((item) => participantesCadastrados.includes(item.name) ? false : true)
            setOperadores(res.data)
        } catch (e) {
            alert(e.message);
        }
        console.log(operadores);
    };

    useEffect(() => {
        getUsers()
    }
        , [])

    return (
        <UserContext.Provider value={{ operadores }}>
            {children}
        </UserContext.Provider>
    )
}