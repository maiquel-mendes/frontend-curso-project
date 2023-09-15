import { Autocomplete, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';

const AddParticipantes = ({ id, atividade, setOpen, getAtividade }) => {
    const [inputs, setInputs] = useState([])

    const { operadores } = useContext(UserContext)

    const participantesCadastrados = atividade.participantes.map(item => item.user.name)

    const operadoresFilter = operadores.filter((item) => participantesCadastrados.includes(item.name) ? false : true)

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.patch(
                process.env.NODE_ENV === "development"
                    ? `${import.meta.env.VITE_MYLOCALHOST}:3000/api/cursos/${id}`
                    : `https://api-curso-project.vercel.app/api/cursos/${id}`,
                {
                    participantes: inputs,
                }
            );
            setOpen(false)
            getAtividade()
            console.log(operadores);
        } catch (e) {
            alert(e.message);
        }
    };


    return (
        <div>
            <Autocomplete
                multiple
                value={inputs}
                onChange={(e, value) => {
                    setInputs(value)
                }}
                id="tags-outlined"
                options={operadoresFilter}
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