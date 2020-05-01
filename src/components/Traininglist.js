import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import Moment from 'react-moment';
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    var moment = require('moment');
    moment().format();

    useEffect(() => {
        getTrainings();
    }, [])
    const handleClose = () =>{
        setOpen(false);
    } 
    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then (response => response.json())
        .then (
            data => setTrainings(data.content)

            )
        
        .catch(err => console.error(err))
    }
    
    const convertTime = (time) => {
        return moment(time).local().format('MMMM Do YYYY, h:mm:ss a')
    }

    const deleteTraining = (url) => {

        if (window.confirm("Are you sure?")) {

            fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(_ => {
                    getTrainings()
                }
                )
                .then(_ => {
                    setOpen(true)
                    setMsg('Training deleted');
                })
                .catch(err => console.error(err))
        }
    }


    const columns = [
        { 
            id: "trainingtime",
            Header: "Time",
        accessor: (row) => (
        convertTime(row.date)
        )
        },
        { Header: "Activity",
        accessor: "activity" 
        },
        { Header: "Duration",
        accessor: "duration" 
        },
        {
            Cell: row => (<Button color="secondary" size="small" onClick={() => deleteTraining(row.original.links[0].href)}>Delete</Button>)
        }
    ]

    return (
        <div>
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
            <ReactTable defaultPageSize={20} filterable={true} data={trainings} columns={columns} />
        </div>
    )
}