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

  fillColor(goal, twSmape, category) {
    if(!category)
      return "#FFFFFF";
    else if (goal > twSmape || goal == 0)
      return "#43A047";
    else
      return "#e53935"
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
          fill={ this.fillColor(goal, twSmape, category) }
          stroke="#fff"
          strokeWidth={0.5}
          strokeOpacity={0.8}
          style={{cursor: 'pointer'}}
        />
        {
          depth === 1 ? (
          <text
            x={x + 50}
            y={y + 18}
            textAnchor="middle"
            fill="#fff"
            stroke="none"
            fontSize={8}
          >
            {(width > 100 && height > 50 && category.length < 20 ) ? category : ""}
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
