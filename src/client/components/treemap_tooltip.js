import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';

const styles = {
  categoryStyle: {
    color: '#1E88E5',
    textDecoration: 'underline',
  },
  goalStyle: {
    color: '#90CAF9',
  },
  twSmapeStyle: {
    color: '#e53935',
  },
  pwSmapeStyle: {
    color: '#e57373',
  },
  errorImpactStyle: {
    color: '#b71c1c',
  },
  doneStyles: {
    color: '66BB6A',
    height: '18px',
    width: '18px',
    marginBottom: '-5px',
  },
  clearStyles: {
    color: 'FF7043',
    height: '18px',
    width: '18px',
    marginBottom: '-5px',
  },
}

const TreemapTooltip  = React.createClass({

  render() {
    const { active, payload } = this.props;

    if (active && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <table>
            <tr style={styles.categoryStyle}>
              <td><b>{data.category}</b></td>
            </tr>
            <tr style={styles.goalStyle}>
              <td><b>GOAL:</b> </td>
              <td>
              {
                (data.goal > data.twSmape) ?
                <ActionDone style={ styles.doneStyles } /> :
                <ContentClear style={ styles.clearStyles } />
              }
              {data.goal}%</td>
            </tr>
            <tr style={styles.twSmapeStyle}>
              <td><b>THIS WEEK SMAPE:</b> </td>
              <td>{data.twSmape}%</td>
            </tr>
            <tr style={styles.pwSmapeStyle}>
              <td><b>PREV WEEK SMAPE:</b> </td>
              <td>{data.pwSmape}%</td>
            </tr>
            <tr style={styles.errorImpactStyle}>
              <td><b>ERROR IMPACT:</b> </td>
              <td>{data.errorImpact}</td>
            </tr>
          </table>
        </div>
      );
    }

    return null;
  }
});

export default TreemapTooltip;
