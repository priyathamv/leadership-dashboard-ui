import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import DmRow from '../components/dm_row';

const styles = {
  tableStyle: {
    paddingRight: "50px"
  }
}

class DmTable extends React.Component {

  constructor(props) {
    super(props);
  }

  renderTableRows() {
    return (
      this.props.dmGoals.map((dmPerformance) => {
        return (
          <DmRow key={dmPerformance.name} dmPerformance={dmPerformance} />
        )
      })
    )
  }

  render() {
    return (
      <Table wrapperStyle={styles.tableStyle}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>TIMELINE</TableHeaderColumn>
            <TableHeaderColumn>TY SMAPE</TableHeaderColumn>
            <TableHeaderColumn>GOAL</TableHeaderColumn>
            <TableHeaderColumn>DIFF</TableHeaderColumn>
            <TableHeaderColumn>ACHIEVED</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.renderTableRows()}
        </TableBody>
      </Table>
    )
  }

}

function mapStateToProps(state) {
  return {
    dmGoals: state.dmGoals
  }
}

export default connect(mapStateToProps, null)(DmTable);
