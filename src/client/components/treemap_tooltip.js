import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';

const styles = {
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
        <table className='treemap-tooltip'>
          <tbody>
            <tr><td>{data.category}</td></tr>
            <tr>
              <td>GOAL:</td>
              <td>
                { data.goal }%
                { (data.goal > data.twSmape) ?
                  <ActionDone style={ styles.doneStyles } /> :
                  <ContentClear style={ styles.clearStyles } /> }
              </td>
            </tr>
            <tr>
              <td>THIS WEEK SMAPE:</td>
              <td>{ data.twSmape }%</td>
            </tr>
            <tr>
              <td>PREV WEEK SMAPE:</td>
              <td>{ data.pwSmape }%</td>
            </tr>
            <tr>
              <td>ERROR IMPACT:</td>
              <td>{ data.errorImpact }</td>
            </tr>
          </tbody>
        </table>
      );
    }

    return null;
  }
});

export default TreemapTooltip;
