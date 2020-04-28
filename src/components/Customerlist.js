import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'


export default function Customerlist() {
    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        getCustomers();
    }, [])
    const getCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then (response => response.json())
        .then (data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        { Header: "First Name",
        accessor: "firstname" 
        },
        { Header: "Last Name",
        accessor: "lastname" 
        },
        { Header: "Email",
        accessor: "email" 
        },
        { Header: "Phone number",
        accessor: "phone" 
        },
        { Header: "Street Address",
        accessor: "streetaddress" 
        },
        { Header: "City",
        accessor: "city" 
        },
        { Header: "Post Code",
        accessor: "postcode" 
        }
    ]

    return (
        <div>
            <ReactTable defaultPageSize={20} filterable={true} data={customers} columns={columns} />
        </div>
    )

}