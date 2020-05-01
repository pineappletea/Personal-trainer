import React, {useState, useEffect} from 'react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Button from '@material-ui/core/Button'
// import './styling.css'
// import 'react-big-calendar/lib/sass/styles';
// import getTrainings from './Functions'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReactTable from 'react-table-v6'


export default function Trainingcalendar(props) {

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer
// const [myEventsList, setMyEventList] = useState()
const [trainings, setTrainings] = useState([])
const [trainingEvents, setTrainingEvents] = useState([])
const commonEnd = new Date(2020, 6, 6, 16)
const [render, setRender] = useState("")

useEffect(() => {
  getTrainings();
  doConversions()
},[])

const populateTrainings = (input) => {
  setTrainings(input)
  return true;
}
const isPopulated = () => {
  if (trainings[0] != null) {
    return true;
  } 
}
const getTrainings = () => {
  fetch("https://customerrest.herokuapp.com/api/trainings")
  .then (response => response.json())
  .then (
      (data) => {
      populateTrainings(data.content);
      console.log("WERE HERE")
      setTimeout(() => {
        doConversions()
        })
    

    }
      )
  .then(_ => isPopulated()
    )
  .then (_ => doConversions())
  .catch(err => console.error(err))
}

/*length
Event {
  title: string,
  start: Date,
  end: Date,
  allDay?: boolean
  resource?: any,


  const addDuration = (duration) => {
  <Moment add={{ hours: 12 }}>{date}</Moment>

    .rbc-calendar {
    min-height: 600px;
  }
}
}
*/

const doConversions = () => {
  console.log(trainings)
  for (let i = 0; i < trainings.length; i++) {
    trainings[i].date = convertTime(trainings[i].date)
    console.log("fuck off")
  }
  setRender(render+1)
}
 const addEndPoint = () => {
   // console.table(trainings)
    console.log("ajettu")
    console.log(trainings)
    var index;
    for (index = 0; index < trainings.length; ++index) {
    console.log(trainings[index]);
}
    // trainings.forEach(console.log(duration))
 }
//  <ul>{trainings}</ul>

const convertTime = (time) => {
  return moment(time).local().format('MMMM Do YYYY, h:mm:ss a')
}
const columns = [
  { 
      id: "trainingtime",
      Header: "Time",
  accessor: 
  "date"
  // (row) => (convertTime(row.date))
  
  },
  { Header: "Activity",
  accessor: "activity" 
  },
  { Header: "Duration",
  accessor: "duration" 
  }
]
const events=[
  {
    title: 'start of the week',
    start: new Date(2020, 5, 5, 15),
    end: new Date(2020, 6, 6, 16),
  }
  /*,
  {
    title: 'single day longer than max',
    start: new Date(2016, 11, 4, 15),
    end: new Date(2016, 11, 4, 23, 30),
  },
  {
    title: 'end of the week',
    start: new Date(2016, 11, 3),
    end: new Date(2016, 11, 3),
  },
  {
    title: 'middle',
    start: new Date(2016, 11, 6),
    end: new Date(2016, 11, 6),
  }
  */
]

return (
<div>
  

  
    <div class="Calendar">
    <Button size="small"  color="primary" onClick={doConversions}>
        OOH 
      </Button>
        <BigCalendar
      localizer={localizer}
      events={trainings}
      // views={allViews}
      resourceTitleAccessor="activity"
      startAccessor="date"
      length="duration"
      // endAccessor={addDuration("duration")}
      style={{ height: 500 }}
    />
    </div>
    <ReactTable defaultPageSize={2} filterable={true} data={trainings} columns={columns} />
    </div>
)



}


