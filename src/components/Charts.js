import React, { useState, useEffect, PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';
import _ from 'lodash';

export default function Charts() {
  let trainings = []
  let customers = []
  const [totalBarData, setTotalBarData] = useState([])
  const [userBars, setUserBars] = useState([])
  let trainingsOfCustomers = []

  useEffect(() => {
    getTrainings()
    //getCustomers()
  }, [])

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
    // Group trainings by activity
    let groupedTrainings = _.groupBy(trainings, 'activity')
    let i = 0;
    // Convert Arrays of Trainings-objects to an Array of Objects containing totals and activity title
    for (let activity in groupedTrainings) {
      barArray[i] = {
        activity: activity,
        total: _.sumBy(groupedTrainings[activity], 'duration')
      }
      i++
    }
    console.log("The totals array")
    setTotalBarData(barArray)
    console.log(barArray)
  }
  /*
  Luovutan 
  
    const getCustomers = () => {
      fetch("https://customerrest.herokuapp.com/api/customers")
          .then(response => response.json())
          .then(data => customers = data.content)
          .then(_ => convertUserChart(displayUserBars))
          .catch(err => console.error(err))
  }
    function displayUserBars(bars) {
      setUserBars(bars)
    }
    function convertUserChart(callback) {
      let trainingsIndex = 0
      // Fetch list of trainings for each customer
      // Target structure is an Array of Objects containing bar title and height
      // Title should be name(first and last), height should be sum of training duration
      // Each loop is a customer
      for (let index in customers) {
        let name = customers[index].firstname + " " //+ customers[index].lastname
        fetch(customers[index].links[2].href)
        .then(response => response.json())
        .then(
          data => {
          if (_.sumBy(data.content, 'duration') != undefined) { // if customer had any training
          trainingsOfCustomers[trainingsIndex] = {
            name: name,
            total: _.sumBy(data.content, 'duration')
          }
          trainingsIndex++
        }})
        .then(_ => console.log(trainingsOfCustomers))
        .then(_=> console.log(customers.length))
        .then(_=> console.log(index))
        .then(_=> {
          if (index +2 >= customers.length) {
            console.log("triggered")
            callback(trainingsOfCustomers)
        }
          }
          )
        .catch(err => console.error(err))
        
      }
  }
  
   
   <BarChart
     width={500}
     height={300}
     data={userBars}
     margin={{
       top: 25, right: 30, left: 20, bottom: 5,
     }}
     barSize={50}
   >
     <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 10 }}/>
        
     <YAxis label={{ value: 'Total duration (min)', angle: -90, position: 'left' }}/>
     <Bar dataKey="total" fill="#8884d8" background={{ fill: '#eee' }} />
   </BarChart>
  */
  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={totalBarData}
        margin={{
          top: 25, right: 30, left: 20, bottom: 5,
        }}
        barSize={50}
      >
        <XAxis dataKey="activity" scale="point" padding={{ left: 50, right: 10 }} />
        <YAxis label={{ value: 'Total duration (min)', angle: -90, position: 'left' }} />
        <Bar dataKey="total" fill="#8884d8" background={{ fill: '#eee' }} />
      </BarChart>

    </div>
  )
}