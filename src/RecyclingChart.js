import React, { Component }from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3'; 
import { scaleBand, scaleLinear } from 'd3-scale'

class RecyclingChart extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  state = {
    incineratedData: [100.00,
      98.30,
      97.60,
      96.90,
      96.20,
      95.50,
      94.80,
      94.10,
      92.80,
      91.40,
      90.00,
      88.60,
      87.20,
      85.80,
      84.40,
      83.00,
      81.60,
      80.20,
      78.80,
      77.40,
      76.00,
      74.60,
      73.20,
      71.80,
      70.40,
      69.00,
      67.60,
      66.20,
      64.80,
      63.40,
      62.00,
      60.60,
      59.20,
      57.80,
      56.40,
      55.00],
    years: [1980,
      1981,
      1982,
      1983,
      1984,
      1985,
      1986,
      1987,
      1988,
      1989,
      1990,
      1991,
      1992,
      1993,
      1994,
      1995,
      1996,
      1997,
      1998,
      1999,
      2000,
      2001,
      2002,
      2003,
      2004,
      2005,
      2006,
      2007,
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015],
    xScale: scaleBand(),
    yScale: scaleLinear(),
    colorScale: scaleLinear()
      .domain([0, 100])
      .range(['#c97f2a', '#613d14'])
  }

  render() {
    const xScale = this.state.xScale
    .domain(this.state.years)
    .range([20, 500])

    const yScale = this.state.yScale 
    .domain([0, 100])
    .range([20, 500])

    const bars = (
      this.state.incineratedData.map((datum, index) =>
        <rect
          key={datum}
          x={index * xScale.bandwidth()}
          y={500-yScale(datum)}
          height={yScale(datum)}
          width={xScale.bandwidth()}
          fill={this.state.colorScale(datum)}
         
        />,
      )
    )
    return (
      <svg height='500' width='500' transform='translate(100,100)'>
        {bars}
      </svg>
    );
  }
}

export default RecyclingChart;
