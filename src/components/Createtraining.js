import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Createtraining(props) { 
    const [newTraining, setNewTraining] = useState({date: '', activity: '', duration: '', customer: props.customer.links[0].href})
    const [open, setOpen] = useState(false)

    const inputChanged = (event) => {
        setNewTraining({...newTraining, [event.target.name]: event.target.value});
    }

    const handleClose = () => {
        props.createTraining(newTraining);
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleClickOpen = () => {
          setOpen(true);
      } 

    return (
        <div>
        <Button size="small"  color="primary" onClick={handleClickOpen}>
        Add training
      </Button>


      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create training </DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="date"
            name="date"
            type="date"
            onChange={inputChanged}
            fullWidth
          />
        <TextField
            autoFocus
            margin="dense"
            id="activity"
            name="activity"
            onChange={inputChanged}
            label="Activity"
            fullWidth
          />
                  <TextField
            autoFocus
            margin="dense"
            id="duration"
            name="duration"
            onChange={inputChanged}
            label="Duration"
            fullWidth
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add training
          </Button>
        </DialogActions>
      </Dialog>


        </div>
    )
}