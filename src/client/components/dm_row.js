import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';

const doneStyles = {
  color: '66BB6A'
};

const clearStyles = {
  color: 'FF7043'
}

class DmRow extends React.Component {
  render() {
    return (
      <TableRow>
        <TableRowColumn><span>{ this.props.dmPerformance.name }</span></TableRowColumn>
        <TableRowColumn><span>{ this.props.dmPerformance.tySmape }%</span></TableRowColumn>
        <TableRowColumn><span>{ this.props.dmPerformance.goal == 0.0 ? 'NA' : (this.props.dmPerformance.goal + '%') }</span></TableRowColumn>
        <TableRowColumn><span>{ this.props.dmPerformance.difference }%</span></TableRowColumn>
        <TableRowColumn>
          <span>
            {
              (this.props.dmPerformance.achieved || (this.props.dmPerformance.goal == 0.0)) ? 
              <ActionDone style={doneStyles} /> :
              <ContentClear style={clearStyles} />
            }
          </span>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default DmRow;
