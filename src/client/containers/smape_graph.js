import React from 'react';
import { connect } from 'react-redux';

import AmCharts from '@amcharts/amcharts3-react';

class Smape extends React.Component {
  constructor(props) {
    super(props);

    this.state =
    {
      "config":  {
        "hideCredits": true,
        "type": "serial",
        "theme": "light",
        "titles": [{
          "text": "Smape"
        }],
        "dataProvider": [],
        "valueAxes": [{
          "gridColor": "#FFFFFF",
          "gridAlpha": 0.2,
          "dashLength": 0
        }],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [{
          "title": "LY Smape",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "bullet": "round",
          "bulletSize": 5,
          "bulletBorderColor": "#ffffff",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 2,
          "valueField": "lySmape"
        }, {
          "title": "TY Smape",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "bullet": "round",
          "bulletSize": 5,
          "bulletBorderColor": "#ffffff",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 2,
          "valueField": "tySmape"
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
      <div>
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
