import React from 'react';
import { connect } from 'react-redux';

import AmCharts from '@amcharts/amcharts3-react';

const styles = {
  graphStyle: {
    backgroundColor: '#FFFFFF',
    marginBottom: '10px',
  }
}

class ActualForecast extends React.Component {
  constructor(props) {
    super(props);

    this.state =
    {
      "config":  {
        "hideCredits": true,
        "type": "serial",
        "theme": "light",
        // "titles": [{
        //   "text": "Actuals and Forecast"
        // }],
        "dataProvider": [],
        "valueAxes": [{
          "gridColor": "#FFFFFF",
          "gridAlpha": 0.2,
          "dashLength": 0
        }],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [{
          "title": "LY Forecast",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "bullet": "round",
          "bulletSize": 5,
          "bulletBorderColor": "#ffffff",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 2,
          "valueField": "lyForecast"
        }, {
          "title": "LY Sales",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "bullet": "round",
          "bulletSize": 5,
          "bulletBorderColor": "#ffffff",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 2,
          "valueField": "lySales"
        }, {
          "title": "TY Forecast",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "bullet": "round",
          "bulletSize": 5,
          "bulletBorderColor": "#ffffff",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 2,
          "valueField": "tyForecast"
        }, {
          "title": "TY Sales",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "bullet": "round",
          "bulletSize": 5,
          "bulletBorderColor": "#ffffff",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 2,
          "valueField": "tySales"
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

  renderActualForecasts() {
    var configUpdated = Object.assign({}, this.state.config, {dataProvider: this.props.actualForecasts});
    return (
      <AmCharts.React style={{ width: "100%", height: "180px" }} options={configUpdated} />
    )
  }

  render() {
    return (
      <div style={styles.graphStyle} >
        {this.renderActualForecasts()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    actualForecasts: state.actualForecasts
  }
}

export default connect(mapStateToProps, null)(ActualForecast);
