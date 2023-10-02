import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Xart from './Xart'

const Index = () => {


    return (
        <div>
            <Xart />

            <Typography align="center" variant="h5" >
                Sistema cadastro de cursos e treinamentos
            </Typography>
            <Typography align="center" variant="h4" >
                <img src="/doe.svg" alt="" height={200} />
            </Typography>
        </div>
    )
}

export default Index