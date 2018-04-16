import React from 'react';
import { connect } from 'react-redux';

import AmCharts from '@amcharts/amcharts3-react';

const styles = {
  graphStyle: {
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.1)',
  }
}

class Smape extends React.Component {
  constructor(props) {
    super(props);

    this.state =
    {
      "config":  {
        "hideCredits": true,
        "type": "serial",
        "theme": "light",
        // "titles": [{
        //   "text": "Smape"
        // }],
        "dataProvider": [],
        "valueAxes": [{
          "id": "v1",
          "title": "SMAPE",
          "position": "left",
          "autoGridCount": false,
          "labelFunction": function(value) {
            return Math.round(value) + "%";
          },
          "gridColor": "#E6E6E6",
          "gridAlpha": 0.2,
          "dashLength": 0,
        }],
        "gridAboveGraphs": true,
        "startDuration": 0,
        "graphs": [{
          "title": "LY Smape",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "lineColor": "#A5D6A7",
          "lineThickness": 2,
          "type": "smoothedLine",
          "valueField": "lySmape",
          "showBalloon": false
        }, {
          "title": "TY Smape",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "lineColor": "#43A047",
          "lineThickness": 2,
          "bullet": "round",
          "bulletSize": 1,
          "bulletBorderColor": "#ffffff",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 1,
          "type": "smoothedLine",
          "valueField": "tySmape",
          "showBalloon": false
        }],
        "chartCursor": {
          "categoryBalloonEnabled": true,
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "week",
        "categoryAxis": {
          "gridPosition": "start",
          "gridAlpha": 0 // horizontal lines opacity
        },
        "legend": {}
      }
    }
  }

  renderSmape() {
    var configUpdated = Object.assign({}, this.state.config, {dataProvider: this.props.smapeList});
    return (
      <AmCharts.React style={{ width: "100%", height: "180px" }} options={configUpdated} />
    )
  }

  render() {
    return (
      <div style={styles.graphStyle} >
        {this.renderSmape()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    smapeList: state.smapeList
  }
}

export default connect(mapStateToProps, null)(Smape);
