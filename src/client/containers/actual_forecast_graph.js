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
            "<div style='background-color: #FFFFFF; padding: 5px 10px; border-color: #FFFFFF;'>" +
              "<div style='color: #2E2E2E; margin-bottom: 3px; text-decoration: underline;'><b>Week [[week]]</b></div>" +
              "<div style='color: #E64A19; margin-bottom: 3px;'><b>TY Forecast:</b> [[tyForecast]]</div>" +
              "<div style='color: #1E88E5; margin-bottom: 3px;'><b>TY Sales:</b> [[tySales]]</div>" +
              "<div style='color: #FFAB91; margin-bottom: 3px;'><b>LY Forecast:</b> [[lyForecast]]</div>" +
              "<div style='color: #90CAF9; margin-bottom: 3px;'><b>LY Sales:</b> [[lySales]]</div>" +
              "<div style='color: #e53935; margin-bottom: -2px;'><b>BIAS:</b> [[bias]]</div>" +
            "</div>",
          "balloonFunction": function(item, graph) {
            var result = graph.balloonText;
            for (var key in item.dataContext) {
              if (item.dataContext.hasOwnProperty(key) && !isNaN(item.dataContext[key])) {
                var formatted = AmCharts.formatNumber(item.dataContext[key], {
                  precision: -1,
                  decimalSeparator: '.',
                  thousandsSeparator: ','
                }, 2);

                if (item.dataContext[key] == null || item.dataContext[key] == 0.0)
                  result = result.replace("[[" + key + "]]", "");
                else if (key == "week")
                  result = result.replace("[[" + key + "]]", item.dataContext[key]);
                else
                  result = result.replace("[[" + key + "]]", formatted);
              }
            }
            return result;
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
          "showBalloon": false
        }, {
          "title": "TY Forecast",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "lineColor": "#E64A19",
          "lineThickness": 2,
          "type": "smoothedLine",
          "valueField": "tyForecast",
          "showBalloon": false
        }, {
          "title": "TY Sales",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "lineColor": "#1E88E5",
          "lineThickness": 2,
          "type": "smoothedLine",
          "valueField": "tySales",
          "showBalloon": false
        }],
        "chartCursor": {
          "categoryBalloonEnabled": true,
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "week",
        "balloon": {
          "adjustBorderColor": true,
          "borderColor": "#FFFFFF",
          "borderThickness": 0,
          "color": "#000000",
          "cornerRadius": 1,
          "fillColor": "#FFFFFF",
          "textAlign": "left",
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
