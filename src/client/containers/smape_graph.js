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
            parentThis.balloonText,
          "balloonFunction": function(item, graph){
            return parentThis.formatBalloonText(item, graph);
          },
        }, {
          "title": "TY Smape",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "lineColor": "#e53935",
          "lineThickness": 2,
          "bullet": "round",
          "bulletSize": 1,
          "bulletBorderColor": "#FFFFFF",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 1,
          "type": "smoothedLine",
          "valueField": "tySmape",
          "showBalloon": false,
          // "balloonText":
          //   parentThis.balloonText,
          // "balloonFunction": function(item, graph){
          //   return parentThis.formatBalloonText(item, graph);
          // },
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
          "marginRight": 40,
          "valueWidth": 45,
          "fontSize": 10,
          "marginBottom": -5,
          "marginTop": -10,
          "valueText": "[[value]]%"
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

    this.balloonText =
      "<table class='graph-tooltip'>" +
        "<tbody>" +
          "<tr><td>Week [[week]]:</td></tr>" +
          "<tr><td><div class='orange-box'></div>LY Smape:</td><td>[[lySmape]]</td></tr>" +
          "<tr><td><div class='red-box'></div>TY Smape:</td><td>[[tySmape]]</td></tr>" +
        "</tbody>" +
      "</table>";

    this.formatBalloonText = (item, graph) => {
      var result = this.balloonText;
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
