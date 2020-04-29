import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Editcustomer(props) { 
    
    const [customer, setCustomer] = useState({firstname: '', lastname: "", email: "", phone: "", streetaddress: "", city: "", postcode:""})
    const [open, setOpen] = useState(false)

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }

    const handleClose = () => {
        props.updateCustomer(props.customer.links[0].href, customer);
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleClickOpen = () => {
        setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, email: props.customer.email, 
          phone: props.customer.phone, streetaddress: props.customer.streetaddress, city: props.customer.city, postcode: props.customer.postcode} )
          setOpen(true);
      } 

    return (
        <div>
        <Button size="small"  color="primary" onClick={handleClickOpen}>
        Edit
      </Button>


      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit customer </DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            label="First name"
            fullWidth
          />
        <TextField
            autoFocus
            margin="dense"
            id="lastname"
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            label="Last name"
            fullWidth
          />
                  <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            value={customer.email}
            onChange={inputChanged}
            label="Email"
            fullWidth
          />
                  <TextField
            autoFocus
            margin="dense"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            label="Phone numner"
            fullWidth
          />
                  <TextField
            autoFocus
            margin="dense"
            id="streetaddress"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            label="Streetaddress"
            fullWidth
          />
                  <TextField
            autoFocus
            margin="dense"
            id="city"
            name="city"
            value={customer.city}
            onChange={inputChanged}
            label="City"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="postcode"
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            label="Postcode"
            fullWidth
          />


        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>


        </div>
    )
}