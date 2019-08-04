import React, { Component }from 'react';
import { Bars, Axis } from './components'
import { Tooltip } from 'reactstrap';
import { scaleBand, scaleLinear } from 'd3-scale'
import { years, discardedData, incineratedData, recycledData } from './recyclingData'

class RecyclingChart extends Component {
  constructor(props) {
    super(props);
  }

  
  state = {
    mode: 1,    
    xScale: scaleBand().domain(years).range([20, 500]),
    yScale: scaleLinear().domain([0, 100]).range([0, 500]),
    hoveredBar: null
  }

  getData = () => {
    const { mode } = this.state
    if (mode === 1) { return discardedData }
    else if (mode === 2) { return incineratedData } 
    else { return recycledData }
  }

  getColorRange = () => {
    const { mode } = this.state
    if (mode === 1) { 
      return scaleLinear().domain([0, 100]).range(['#c97f2a', '#613d14'])
    }
    else if (mode === 2) { 
      return scaleLinear().domain([0, 100]).range(['#a3ad5f', '#4d522a'])
    } 
    else { 
      return scaleLinear().domain([0, 100]).range(['#3ccf4b', '#16541c']) 
    }
  }

  render() {
  const { xScale, yScale, mode } = this.state
  return (
    <>
    <div>
    <h1>How has waste disposal changed?</h1>
    <p>This visualization shows you how our waste management has changed over time.</p>
    <p>Notice how as the discarded trash values decrease, other management methods such as recycling increase.</p>
    <button onClick={()=> this.setState({ mode: 1})} disabled={mode===1}>
      Disposed trash
    </button>
    <button onClick={()=> this.setState({ mode: 2})} disabled={mode===2}>
      Incinerated trash
    </button>
    <button onClick={()=> this.setState({ mode: 3})} disabled={mode===3}>
      Recycled trash
    </button>
    </div>
    <svg height='700' width='700' transform='translate(100,100)'>
    <Bars
      data = {this.getData()}
      xScale = {xScale}
      yScale = {yScale}
      colorScale = {this.getColorRange()}
      onMouseOverCallback={datum => this.setState({hoveredBar: datum})}
      onMouseOutCallback={datum => this.setState({hoveredBar: null})}
    />
      <Axis
       orient = 'Bottom'
       scale = {xScale}
       tickSize = {10}
       translate = 'translate(-25, 500)' 
      />
      <Axis
       orient = 'Left'
       scale = {yScale}
       tickSize = {10}
       translate = 'translate(0,0)'
      />
      </svg>
    </>
    );
  }
}

export default RecyclingChart;
