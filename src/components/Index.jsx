import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Xart from './Xart'

const Index = ({ mode }) => {


    return (
        <Typography align="center" variant="h4">
            <Xart />
            Abra o menu para visualizar as opções disponiveis
        </Typography>
    )
}

export default Index