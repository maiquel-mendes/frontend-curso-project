import {
    Backdrop, Box, Button, Card, CardActionArea, CardContent, CircularProgress,
    Container, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddParticipantes from './AddParticipantes';
import { Delete } from '@mui/icons-material';
import { UserContext } from '../context/UserContext';

const Users = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { operadores } = useContext(UserContext)


    // if (loading) {
    //     return (<Backdrop
    //         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //         open={loading}
    //     // onClick={() => setLoading(false)}
    //     >
    //         <CircularProgress color="inherit" />
    //     </Backdrop>)
    // }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function BasicTable() {
        return (
            <TableContainer component={Box}>
                <Table sx={{ minWidth: { xs: 250, md: 600 } }} size='medium' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell >Nome</TableCell>
                            <TableCell align="center">Treinamentos</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {operadores.map((row, index) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                key={row.id}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.cursos.length}</TableCell>
                                {/* <TableCell sx={{ border: 'none' }} >
                                    <Button onClick={() => console.log('oi')}>
                                        <Delete />
                                    </Button>
                                </TableCell> */}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <Box mt={6} display={"flex"} alignContent='center' justifyContent={'center'}>


            <Card elevation={4} sx={{ maxWidth: 800 }}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Relatorio de participação
                    </Typography>

                    <BasicTable />
                </CardContent>

            </Card>
        </Box>
    )
}

export default Users