import React, {useState} from 'react';


export default function getTrainings() {
    const [trainings, setTrainings] = useState([]);
    fetch("https://customerrest.herokuapp.com/api/trainings")
    .then (response => response.json())
    .then (
        data => setTrainings(data.content)
        )
    .catch(err => console.error(err))

    return trainings;
}