import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const DeleteDialog = ({ open, handleClose, delFunc }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Você deseja realmente excluir esses dados?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Alertamos que após a exclusão não será possivel recuperar os dados
          apagados!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='error' onClick={delFunc}>
          Sim
        </Button>
        <Button
          variant='contained'
          color='success'
          onClick={handleClose}
          autoFocus
        >
          Não
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
