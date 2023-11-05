import React, { useContext } from 'react'
import { TextField, Button, Stack, Box, Typography } from '@mui/material'
import { appendErrors, useForm } from 'react-hook-form'
import StoreContext from '../context/StoreContext'
import { Navigate, useNavigate } from 'react-router-dom'

export const LoginPage = () => {
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const { register, handleSubmit, formState, resetField } = form
    const { errors } = formState
    const { setToken } = useContext(StoreContext);
    const navigate = useNavigate()

    function login({ email, password }) {
        if (email === 'admin' && password === 'admin') {
            return { token: '1234' };
        }
        return { error: 'Usuário ou senha inválido' };
    }

    const onSubmit = (data) => {
        const { token, error } = login(data)

        if (token === '1234') {
            setToken(token);
            console.log(token)
            return navigate('/')

        } else {
            resetField('password')
            console.log('erro', error);
        }
        console.log(token, formState.isSubmitted);


    }

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center"
                sx={{ mt: 5, p: 5 }}
                noValidate
                autoComplete="off">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2} >
                        <Typography align="center" variant="h5" >
                            Sistema cadastro de cursos e treinamentos
                        </Typography>
                        <Typography align="center" variant="h4" >
                            <img src="/doe.svg" alt="" height={200} />
                        </Typography>
                        <h1>Login</h1>
                        <TextField
                            label='Email'
                            type='email'
                            {...register('email',
                                { required: 'Email is required' })
                            }
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField label='password' type='password' {...register('password', { required: 'Password is required' })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Button type='submit' variant='contained' color='primary'>
                            Login
                        </Button>
                    </Stack>
                </form>
            </Box>
        </>
    )
}
