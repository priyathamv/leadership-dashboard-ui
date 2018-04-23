import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TreemapCell extends Component {
  static displayName = 'TreemapItemDemo';

  static propTypes = {
    depth: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    index: PropTypes.number,
    payload: PropTypes.object,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const { depth, x, y, width, height, index, goal, twSmape, category } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={goal < twSmape ? "#b71c1c" : "#2E7D32"}
          stroke="#fff"
          strokeWidth={0.5}
          strokeOpacity={0.8}
        />
        {
          depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 9}
            textAnchor="middle"
            fill="#fff"
            stroke="none"
            fontSize={12}
          >
            {(width > 100 && height > 50) ? category : ""}
          </text> )
          : null
        }
        {
          depth === 1 ?
          <text
            x={x + 4}
            y={y + 22}
            fill="#fff"
            stroke="none"
            fontSize={12}
            fillOpacity={0.5}
          >

          </text>
          : null
        }
      </g>
    );
  }
}
