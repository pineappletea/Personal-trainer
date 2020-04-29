import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import Moment from 'react-moment';


export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    var moment = require('moment');
    moment().format();

    useEffect(() => {
        getCustomers();
    }, [])
    const getCustomers = () => {
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
        }
    ]

    return (
        <div>
            <ReactTable defaultPageSize={20} filterable={true} data={trainings} columns={columns} />
        </div>
    )

}