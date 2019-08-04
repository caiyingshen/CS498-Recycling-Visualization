import React, { Component }from 'react';
import { Tooltip } from 'reactstrap';

export default class Bars extends Component {
  constructor(props) {
    super(props);
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
            onMouseOver={() => this.props.onMouseOverCallback(datum, index)}
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

