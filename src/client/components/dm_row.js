import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';

const styles = {
  doneStyles: {
    color: '66BB6A',
  },
  clearStyles: {
    color: 'FF7043',
  },
  rowStyle: {
    height: '40px',
    padding: '5px 10px',
  },
}


class DmRow extends React.Component {
  render() {
    return (
      <TableRow style={ styles.rowStyle }>
        <TableRowColumn style={ styles.rowStyle }>
          <span>{ this.props.dmPerformance.name }</span>
        </TableRowColumn>

        <TableRowColumn style={ styles.rowStyle }>
          <span>{ this.props.dmPerformance.tySmape }%</span>
        </TableRowColumn>

        <TableRowColumn style={ styles.rowStyle }>
          <span>{ this.props.dmPerformance.goal == 0.0 ? 'NA' : (this.props.dmPerformance.goal + '%') }</span>
        </TableRowColumn>

        <TableRowColumn style={ styles.rowStyle }>
          <span>{ (this.props.dmPerformance.goal == 0.0) ? (this.props.dmPerformance.tySmape) : (this.props.dmPerformance.difference) }%</span>
        </TableRowColumn>

        <TableRowColumn style={ styles.rowStyle }>
          <span>
            {
              (this.props.dmPerformance.achieved || (this.props.dmPerformance.goal == 0.0)) ?
              <ActionDone style={ styles.doneStyles } /> :
              <ContentClear style={ styles.clearStyles } />
            }
          </span>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default DmRow;
