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
          "lineColor": "#e57373",
          "lineThickness": 2,
          "bullet": "round",
          "bulletSize": 1,
          "bulletBorderColor": "#ffffff",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 1,
          "type": "smoothedLine",
          "valueField": "lySmape",
          "balloonText":
            "<div style='background-color: #FFFFFF; padding: 5px 10px; border-color: #FFFFFF;'>" +
              "<div style='color: #2E2E2E; margin-bottom: 3px; text-decoration: underline;'><b>Week [[week]]</b></div>" +
              "<div style='color: #e57373; margin-bottom: 3px;'><b>LY Smape:</b> [[lySmape]]</div>" +
              "<div style='color: #e53935; margin-bottom: 3px;'><b>TY Smape:</b> [[tySmape]]</div>" +
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
                  result = result.replace("[[" + key + "]]", formatted + "%");
              }
            }
            return result;
          },
        }, {
          "title": "TY Smape",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "lineColor": "#e53935",
          "lineThickness": 2,
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
            "color": "#e53935",
            "align": "center",
      			"y": 75,
      		},
          {
      			"text": "Please wait, while the data is being fetched!",
            "color": "#e57373",
            "align": "center",
      			"y": 90,
      		}
      	],
      }
    }
  }

  renderSmape() {

    var configUpdated = (this.props.smapeList.length > 0 ) ?
      Object.assign({}, this.state.config, {dataProvider: this.props.smapeList, allLabels: []}) :
      Object.assign({}, this.state.config, {dataProvider: this.props.smapeList});
    return (
      <AmCharts.React style={{ width: "100%", height: "150px" }} options={configUpdated} />
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
