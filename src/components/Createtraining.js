import React, {useState, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';


export default function Createtraining(props) {
    const [newTraining, setNewTraining] = useState({date: new Date(), activity: '', duration: '', customer: props.customer.links[0].href})
    const [open, setOpen] = useState(false)

    const inputChanged = (event) => {
        setNewTraining({...newTraining, [event.target.name]: event.target.value});
    }

    const dateChanged = (date) => {
      setNewTraining({...newTraining, date: date})
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
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Button size="small"  color="primary" onClick={handleClickOpen}>
        Add training
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create training </DialogTitle>
        <DialogContent>
      
        <DateTimePicker
        inputVariant="outlined"
        id="date"
        name="date"
        value={newTraining.date}
        onChange={date => dateChanged(date)}
        label="Date and Time"
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
      </MuiPickersUtilsProvider>

        </div>
    )
}