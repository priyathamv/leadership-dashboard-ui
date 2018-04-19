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
import Spinner from '../components/spinner';

const styles = {
  tableStyle: {
    marginRight: '5px',
    boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.1)',
  },
  dmFrameStyle: {
    position: 'relative',
  },
  spinnerStyle: {
    position: 'absolute',
    top: '42%',
    left: '41%',
  },
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
      <div style={ styles.dmFrameStyle }>
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
        { this.props.isLoading && <Spinner style={ styles.spinnerStyle } /> }
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    dmGoals: state.dmGoals.data,
    isLoading: state.dmGoals.isLoading
  }
}

export default connect(mapStateToProps, null)(DmTable);
