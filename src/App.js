import './App.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import { Label, LineChart, Line, XAxis, YAxis } from 'recharts'
import { CartesianGrid, Tooltip, Legend } from 'recharts'
import { forecast } from './sir.js'

export function App() {
  const defaults = {
    initState: {S: 0.997, I:0.003, R: 0},
    infectRate: 0.4,
    recoverRate: 0.04,
    days: 100
  }

  const [initState, setInitState] = useState(defaults.initState)
  const [infectRate, setInfectRate] = useState(defaults.infectRate)
  const [recoverRate, setRecoverRate] = useState(defaults.recoverRate)
  const [days, setDays] = useState(defaults.days)
  const path = forecast(days, initState, infectRate, recoverRate)

  const handleInfectRateSlider = (event, newValue) => {
    setInfectRate(newValue)
  }

  const handleRecoverRateSlider = (event, newValue) => {
    setRecoverRate(newValue)
  }

  const handleDaySlider = (event, newValue) => {
    setDays(newValue)
  }

  const handleInitState = () => {
    setInitState({
      S: +document.getElementById("S-input").value,
      I: +document.getElementById("I-input").value,
      R: +document.getElementById("R-input").value,
    })
  }

  const handleS = (event) => {
    const S = +event.target.value
    const I = +document.getElementById("I-input").value
    const R = (1 - S - I).toFixed(6)
    document.getElementById("R-input").value = R
  }

  const handleI = (event) => {
    const S = +document.getElementById("S-input").value
    const I = +event.target.value
    const R = (1 - S - I).toFixed(6)
    document.getElementById("R-input").value = R
  }

  const chartMargin = {
    top: 0,
    right: 0,
    left: 20,
    bottom: 0,
  }

  const Value = (props) => <i>{props.value}</i>

  return (
    <div className="App">
      <h1> SIR Model as Discrete-time Markov Chain </h1>

      <div>
        <TextField id="S-input" label="S"
          defaultValue={defaults.initState.S}
          onChange={handleS}
        />
        <TextField id="I-input" label="I"
          defaultValue={defaults.initState.I}
          onChange={handleI}
        />
        <TextField id="R-input" label="R" disabled
          defaultValue={defaults.initState.R}
        />
        <br/>
        <Button
          className="sir-btn"
          variant="contained"
          onClick={handleInitState}>
          Reset initial state
        </Button>
      </div>

      <Box className="sir-box">
        <Typography>
          Infection Rate: <Value value={infectRate}/>
        </Typography>
        <Slider
          size="small"
          defaultValue={defaults.infectRate}
          min={0} max={1} step={1e-4}
          onChange={handleInfectRateSlider}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box className="sir-box">
        <Typography>
          Recovery Rate: <Value value={recoverRate}/>
        </Typography>
        <Slider
          size="small"
          defaultValue={defaults.recoverRate}
          min={0} max={1} step={1e-4}
          onChange={handleRecoverRateSlider}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box className="sir-box">
        <Typography>
          Days: <Value value={days}/>
        </Typography>
        <Slider
          size="small"
          defaultValue={defaults.days}
          min={1} max={1000} step={1}
          onChange={handleDaySlider}
          valueLabelDisplay="auto"
        />
      </Box>

      <LineChart width={500} height={300} data={path} margin={chartMargin} >
        <XAxis dataKey="day">
          <Label value="Day" postition="bottom" dy={25} />
        </XAxis>
        <YAxis type="number" domain={[0, 1]}>
           <Label angle={-90} value='Proportion'
                  position='insideLeft' style={{textAnchor: 'middle'}}/>
        </YAxis>
        <Tooltip formatter={ (value) => `${(+value * 100).toFixed(3)}%`} position={{y: 300}}/>
        <Legend align="right"/>
        <CartesianGrid stroke="#eee" />
        <Line  dataKey="S" dot={false} strokeWidth="2" stroke="red" />
        <Line  dataKey="I" dot={false} strokeWidth="2" stroke="blue" />
        <Line  dataKey="R" dot={false} strokeWidth="2" stroke="orange" />
      </LineChart>
    </div>
  );
}
