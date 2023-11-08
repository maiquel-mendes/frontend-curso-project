import api from '../api/configure-axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [operadores, setOperadores] = useState([]);

  async function getUsers() {
    try {
      const res = await api.get('/user');
      // const resFiltered = res.data.filter((item) => participantesCadastrados.includes(item.name) ? false : true)
      setOperadores(res.data);
      console.log(res.data);
    } catch (e) {
      alert(e.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ operadores, getUsers }}>
      {children}
    </UserContext.Provider>
  );
};
