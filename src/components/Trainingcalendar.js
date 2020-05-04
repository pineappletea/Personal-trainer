import React, {useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Trainingcalendar() {

const localizer = momentLocalizer(moment)
const [trainingEvents, setTrainingEvents] = useState([])
let trainings= []

useEffect(() => {
  getTrainings()
},[])

const getTrainings = () => {
  fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(response => response.json())
      .then(
          data => (trainings = data.content)
      )
      .then(_ => convertToEvents())
      .catch(err => console.error(err))
}

const convertToEvents = () => {
  let array = [];
  for (let i = 0; i < trainings.length; i++) {
      array[i]  = {
          title: trainings[i].activity,
          start: moment(trainings[i].date).toDate(),
          end: moment(trainings[i].date).add(trainings[i].duration, 'm').toDate()
      }
  }
  setTrainingEvents(array)
  console.log(array)
}


return (
    <div class="Calendar">
        <Calendar
      localizer={localizer}
      events={trainingEvents}
      style={{ height: 500 }}
    />
    </div>

)



}


