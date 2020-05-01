import React, {useState, useEffect} from 'react';
import './App.css';
import { Toolbar, Typography, AppBar, Link, Breadcrumbs } from '@material-ui/core';
import { BrowserRouter, Route } from "react-router-dom";
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Trainingcalendar from "./components/Trainingcalendar"

function App() {

  return (
    <div className="App">

      <AppBar position="static" className="App-header">
        <Toolbar>

          <Typography variant="h4">
            Personal Trainer
            <Breadcrumbs style={{ marginLeft: 30, marginTop: 3 }} aria-label="breadcrumb" color="inherit">
            <Link color="inherit" href="/Traininglist" onClick={Traininglist}>Trainings</Link>
            <Link color="inherit" href="/Customerlist" onClick={Customerlist}>Customers</Link>
            <Link color="inherit" href="/Calendar" onClick={Trainingcalendar}>Calendar</Link>
          </Breadcrumbs>
          </Typography>

        </Toolbar>
      </AppBar>
      <BrowserRouter>
      <Route path="/Traininglist" component={Traininglist} />
      <Route path="/Customerlist" component={Customerlist} />
      <Route path="/Calendar" component={Trainingcalendar} />
      </BrowserRouter>
    </div>

  );
}

export default App;
