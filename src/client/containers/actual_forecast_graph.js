import React from 'react';
import { connect } from 'react-redux';

import AmCharts from '@amcharts/amcharts3-react';

const styles = {
  graphStyle: {
    backgroundColor: '#FFFFFF',
    marginBottom: '5px',
    boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.1)',
  }
}

class ActualForecast extends React.Component {
  constructor(props) {
    super(props);
    const parentThis = this;
    this.state =
    {
      "config":  {
        "hideCredits": true,
        "type": "serial",
        "theme": "light",
        "dataProvider": [],
        "valueAxes": [{
          "id": "v1",
          "title": "ACTL & FCST",
          "position": "left",
          "autoGridCount": false,
          "labelFunction": function(value) {
            return Math.round(value/1000000) + "M";
          },
          "gridColor": "#E6E6E6",
          "gridAlpha": 0.2,
          "dashLength": 0,
        }],
        "gridAboveGraphs": true,
        "startDuration": 0,
        "graphs": [{
          "title": "LY Forecast",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "lineColor": "#FFAB91",
          "lineThickness": 2,
          "bullet": "round",
          "bulletSize": 1,
          "bulletBorderColor": "#FFFFFF",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 1,
          "type": "smoothedLine",
          "valueField": "lyForecast",
          "balloonText":
            parentThis.balloonText,
          "balloonFunction": function(item, graph){
            return parentThis.formatBalloonText(item, graph);
          },
        }, {
          "title": "LY Sales",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "lineColor": "#90CAF9",
          "lineThickness": 2,
          "bullet": "round",
          "bulletSize": 1,
          "bulletBorderColor": "#FFFFFF",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 1,
          "type": "smoothedLine",
          "valueField": "lySales",
          "balloonText":
            parentThis.balloonText,
          "balloonFunction": function(item, graph){
            return parentThis.formatBalloonText(item, graph);
          },
        }, {
          "title": "TY Forecast",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "lineColor": "#E64A19",
          "lineThickness": 2,
          "type": "smoothedLine",
          "valueField": "tyForecast",
          "balloonText":
            parentThis.balloonText,
          "balloonFunction": function(item, graph){
            return parentThis.formatBalloonText(item, graph);
          },
        }, {
          "title": "TY Sales",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "lineColor": "#1E88E5",
          "lineThickness": 2,
          "type": "smoothedLine",
          "valueField": "tySales",
          "balloonText":
            parentThis.balloonText,
          "balloonFunction": function(item, graph){
            return parentThis.formatBalloonText(item, graph);
          },
        }],
        "chartCursor": {
          "categoryBalloonEnabled": true,
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "week",
        "balloon": {
          "adjustBorderColor": false,
          "fillAlpha": 0,
          "borderColor": "#FFFFFF",
          "borderThickness": 0,
        },
        "categoryAxis": {
          "gridPosition": "start",
          "gridAlpha": 0.05,
          "fontSize": 7,
          "autoGridCount": false,
          "gridCount": 52
        },
        "legend": {
          "markerSize": 10,
          "autoMargins": false,
          "marginRight": 75,
          "valueWidth": 90,
          "fontSize": 10,
          "marginBottom": -5,
          "marginTop": -10,
        },
        "allLabels": [
      		{
      			"text": "Loading...",
      			"bold": true,
            "color": "#1E88E5",
            "align": "center",
      			"y": 75,
      		},
          {
      			"text": "Please wait, while the data is being fetched!",
            "color": "#90CAF9",
            "align": "center",
      			"y": 90,
      		}
      	],
      }
    }

    this.balloonText =
    "<table class='graph-tooltip'>" +
      "<tbody>" +
        "<tr><td>Week [[week]]:</td></tr>" +
        "<tr><td><div class='red-box'></div>TY Forecast:</td><td>[[tyForecast]]</td></tr>" +
        "<tr><td><div class='darkblue-box'></div>TY Sales:</td><td>[[tySales]]</td></tr>" +
        "<tr><td><div class='orange-box'></div>LY Forecast:</td><td>[[lyForecast]]</td></tr>" +
        "<tr><td><div class='skyblue-box'></div>LY Sales:</td><td>[[lySales]]</td></tr>" +
        "<tr><td><div class='red-box'></div>Bias</td><td>[[bias]]</td></tr>" +
      "</tbody>" +
    "</table>";

    this.formatBalloonText = (item, graph) => {
      var result = this.balloonText;
      for (var key in item.dataContext) {
        if (item.dataContext.hasOwnProperty(key) && !isNaN(item.dataContext[key])) {
          const valueInMillions = item.dataContext[key]/1000000;
          var formatted = AmCharts.formatNumber(valueInMillions, {
            precision: 0,
            decimalSeparator: '.',
            thousandsSeparator: ''//','
          });

          // To display nothing on tooltip when the value is null or 0
          if (item.dataContext[key] == null || item.dataContext[key] == 0.0)
            result = result.replace("[[" + key + "]]", "");
          else if (key == "week")
            result = result.replace("[[" + key + "]]", item.dataContext[key]);
          else{
            result = result.replace("[[" + key + "]]", "[[" + key + "]]M");
            result = result.replace("[[" + key + "]]", formatted);
          }

        }
      }
      return result;
    }
  }

  renderActualForecasts() {
    var configUpdated = (this.props.actualForecasts.length > 0 ) ?
      Object.assign({}, this.state.config, {dataProvider: this.props.actualForecasts, allLabels: []}) :
      Object.assign({}, this.state.config, {dataProvider: this.props.actualForecasts});
    return (
      <AmCharts.React style={{ width: "100%", height: "150px" }} options={configUpdated} />
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
