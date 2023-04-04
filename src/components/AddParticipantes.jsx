import { Autocomplete, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AddParticipantes = ({ id, atividade, setOpen, getAtividade }) => {
    const [inputs, setInputs] = useState([])
    const [operadores, setOperadores] = useState([])

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.patch(
                process.env.NODE_ENV === "development"
                    ? `http://192.168.15.40:3000/api/cursos/${id}`
                    : `https://api-curso-project.vercel.app/api/cursos/${id}`,
                {
                    participantes: inputs,
                }
            );
            console.log(res.data);
            setOpen(false)
            getAtividade()
            //   setInputs(initialState)
        } catch (e) {
            alert(e.message);
        }
    };

    async function getUsers() {
        try {
            const res = await axios.get(
                process.env.NODE_ENV === "development" ? "http://192.168.15.40:3000/api/user" : "https://api-curso-project.vercel.app/api/user"
            );
            console.log(res.data);
            setOperadores(res.data)
        } catch (e) {
            alert(e.message);
        }
    };

    useEffect(() => {

        getUsers()
    }
        , [])

    return (
        <div>
            <Autocomplete
                multiple
                value={inputs}
                onChange={(e, value) => {
                    console.log(inputs);
                    setInputs(value)
                }}
                id="tags-outlined"
                options={operadores}
                getOptionLabel={(option) => option?.name}
                defaultValue={[]}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Incluir participantes"
                        placeholder="Participantes"
                    />
                )}
            />
            <Button onClick={onSubmit}>Gravar</Button>
        </div>
    )
}

export default AddParticipantes