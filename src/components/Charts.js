import React, { useState, useEffect, PureComponent } from 'react';
import {
BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';
import _ from 'lodash';

export default function Charts() {
  let trainings= []
  const [barData, setBarData] = useState([])

  useEffect(() => {
    getTrainings()
  },[])

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(
          data => (trainings = data.content)
        )
        .then(_ => convertToChartArray())
        .catch(err => console.error(err))
}

  const convertToChartArray = () => {
    let barArray = []
    let groupedTrainings
    // Group trainings by activity
    groupedTrainings = _.groupBy(trainings, 'activity')
    let i = 0;
    // Convert Arrays of Trainings-objects to an Array of Objects containing totals and activity title
    for (const activity in groupedTrainings) {
     barArray[i] = {
       activity: activity,
       total: _.sumBy(groupedTrainings[activity], 'duration')
     }
     i++
    }
    setBarData(barArray)
  }
    return (
      <div>
      <BarChart
   width={500}
   height={300}
   data={barData}
   margin={{
     top: 25, right: 30, left: 20, bottom: 5,
   }}
   barSize={50}
 >
   <XAxis dataKey="activity" scale="point" padding={{ left: 50, right: 10 }}/>
      
   <YAxis label={{ value: 'Total duration (min)', angle: -90, position: 'left' }}/>
   <Tooltip />
   <Legend />
   <CartesianGrid strokeDasharray="3 3" />
   <Bar dataKey="total" fill="#8884d8" background={{ fill: '#eee' }} />
 </BarChart>

   </div>
    )
}