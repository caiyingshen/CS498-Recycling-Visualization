import React, { Component }from 'react';
import { Tooltip } from 'reactstrap';

export default class Bars extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    tooltipOpen: false
  }

  toggle = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen })
  }

  onMouseOverCallback = datum => {
    return (
      <Tooltip placement="top" 
      isOpen={this.state.tooltipOpen} 
      autohide={false} 
      target="rect" 
      toggle={this.toggle}>
        {datum}
      
      </Tooltip>
    )
  }

  render() {
    const { data, xScale, yScale, colorScale } = this.props
    const bars = (
        data.map((datum, index) =>
          <rect
            key={datum}
            x={index * xScale.bandwidth()}
            y={500-yScale(datum)}
            height={yScale(datum)}
            width={xScale.bandwidth()}
            fill={colorScale(datum)}
            onMouseOver={() => this.onMouseOverCallback(datum)}
            onMouseOut={() => this.props.onMouseOutCallback(null)}
          />,
        )
    )

  return (
    <g>
    {bars}
    </g>
  )
  }

}

