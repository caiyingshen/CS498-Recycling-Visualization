import React, { Component }from 'react';
import { Bars, Axis } from './components'
import { Button, Card, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { scaleBand, scaleLinear } from 'd3-scale'
import './App.css'
import { years, discardedData, incineratedData, recycledData } from './recyclingData'

class RecyclingChart extends Component {
  constructor(props) {
    super(props);
  }

  
  state = {
    mode: 1,    
    xScale: scaleBand().domain(years).range([20, 500]),
    yScale: scaleLinear().domain([0, 100]).range([0, 500]),
    hoveredData: null, 
    hoveredYear: null
  }
 
  getData = () => {
    const { mode } = this.state
    if (mode === 1) { return discardedData }
    else if (mode === 2) { return incineratedData } 
    else { return recycledData }
  }

  getContext = () => {
    const { mode } = this.state
    if (mode === 1) { return 'discarded' }
    else if (mode === 2) { return 'incinerated' } 
    else { return 'recycled' }
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

  getDescriptiveText = () => {
    const { mode } = this.state
    if (mode === 1) { 
      return "Discarded trash simply means trash that is in landfills or oceans. Before the population started exponentially increasing, this was a reasonable solution for waste. However, now we are moving towards other cleaner and more efficient technologies.";
    }
    else if (mode === 2) { 
      return "Incineration was a new technology introduced around the 1980's. People quickly realized problems with it however, as burning trash often releases toxins into our atmosphere."
    } 
    else { 
      return "Recycling is the cleanest form of waste management, yet today it is still not even 30% of how we process our waste."
    }
  }

  render() {
  const { xScale, yScale, mode } = this.state
  return (
    <>
    <div className="header-section">
    <h1>How has waste disposal changed?</h1>
    <p>This visualization shows you how our waste management has changed over time.</p>
    <p>Notice how as the discarded trash values decrease, other management methods such as recycling increase.</p>
    <p>*Hover* over the chart to learn more about the values!</p>

    <Button onClick={()=> this.setState({ mode: 1})} disabled={mode===1}>
      Disposed trash
    </Button>
    <Button onClick={()=> this.setState({ mode: 2})} disabled={mode===2}>
      Incinerated trash
    </Button>
    <Button onClick={()=> this.setState({ mode: 3})} disabled={mode===3}>
      Recycled trash
    </Button>

    <p>{this.getDescriptiveText()}</p>
    </div>
    <svg height='700' width='700' transform='translate(100,100)'>
    <Bars
      data = {this.getData()}
      xScale = {xScale}
      yScale = {yScale}
      colorScale = {this.getColorRange()}
      onMouseOverCallback={(datum, year ) => this.setState({ hoveredData: datum, hoveredYear: year })}
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
    <div className="detail-card-view">
      <Card>
        <CardTitle>Detail View</CardTitle>
        <CardSubtitle>Hover over the chart to see more information.</CardSubtitle>
        {this.state.hoveredYear && 
        <>
        <CardText>
        {`In ${1980+this.state.hoveredYear}, ${this.state.hoveredData}% of waste was ${this.getContext()}.`}
        </CardText>
        </>
        }
      </Card>
    </div>
      
    </>
    );
  }
}

export default RecyclingChart;
