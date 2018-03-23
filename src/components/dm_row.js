import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class DmRow extends React.Component {

  render() {
    return (
      <TableRow>
        <TableRowColumn><span>{this.props.dmPerformance.name}</span></TableRowColumn>
        <TableRowColumn><span>{this.props.dmPerformance.tySmape}%</span></TableRowColumn>
        <TableRowColumn><span>{this.props.dmPerformance.goal}%</span></TableRowColumn>
        <TableRowColumn><span>{this.props.dmPerformance.difference}%</span></TableRowColumn>
        <TableRowColumn><span>{(this.props.dmPerformance.achieved) ? "Yes" : "No"}</span></TableRowColumn>
      </TableRow>
    )
  }
}

export default DmRow;
