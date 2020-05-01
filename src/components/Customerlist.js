import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import Editcustomer from './Editcustomer'
import Addcustomer from './Addcustomer'
import Snackbar from '@material-ui/core/Snackbar'
import Createtraining from './Createtraining'

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getCustomers();
    }, [])
    const handleClose = () =>{
        setOpen(false);

    }

    const getCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    // function gets passed as a prop to editcustomer
    const updateCustomer = (url, customer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(_ => {
                getCustomers()
            }
            )
            .then(_ => {
                setOpen(true)
                setMsg('Customer edited');
            })
            .catch(err => console.error(err))
    }

    // function gets passed as a prop to Addcustomer
    const addCustomer = (customer) => {
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(_ => {
                getCustomers()
            }
            )
            .then(_ => {
                setOpen(true)
                setMsg('Customer created');
            })
            .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {

        if (window.confirm("Are you sure?")) {

            fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(_ => {
                    getCustomers()
                }
                )
                .then(_ => {
                    setOpen(true)
                    setMsg('Customer deleted');
                })
                .catch(err => console.error(err))
        }
    }

    const createTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(_ => {
                getCustomers()
            }
            )
            .then(_ => {
                setOpen(true)
                setMsg('Training added');
            })
            .catch(err => console.error(err))

    }

    const columns = [
        {
            Header: "First Name",
            accessor: "firstname"
        },
        {
            Header: "Last Name",
            accessor: "lastname"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Phone number",
            accessor: "phone"
        },
        {
            Header: "Street Address",
            accessor: "streetaddress"
        },
        {
            Header: "City",
            accessor: "city"
        },
        {
            Header: "Post Code",
            accessor: "postcode"
        },
        {
            Cell: row => (<Createtraining customer={row.original} createTraining={createTraining} />)
        },
        {
            Cell: row => (<Editcustomer customer={row.original} updateCustomer={updateCustomer} />)
        },
        {
            Cell: row => (<Button color="secondary" size="small" onClick={() => deleteCustomer(row.original.links[0].href)}>Delete</Button>)
        }
    ]

    return (
        <div>
            <Addcustomer addCustomer={addCustomer} />
            <ReactTable defaultPageSize={20} filterable={true} data={customers} columns={columns} />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={msg}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            />
        </div>
    )

}