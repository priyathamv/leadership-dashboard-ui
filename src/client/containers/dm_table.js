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
    boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.1)',
  },
  dmFrameStyle: {
    marginRight: '5px',
    marginBottom: '5px',
    position: 'relative',
  },
  spinnerStyle: {
    position: 'absolute',
    top: '42%',
    left: '41%',
  },
  rowStyle: {
    height: '30px',
    padding: '5px 10px',
  },
  headerStyle: {
    height: '30px',
    padding: '10px 10px 0px 10px',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.1)',
    marginBottom: '1px',
    fontSize: '18px',
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
          <DmRow key={ dmPerformance.name } dmPerformance={ dmPerformance } />
        )
      })
    )
  }

  render() {
    return (
      <div style={ styles.dmFrameStyle }>
        <div style={ styles.headerStyle }>DM PERFORMANCE (Current Week - 11811)</div>

        <Table wrapperStyle={ styles.tableStyle }>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={ styles.rowStyle }>
              <TableHeaderColumn style={ styles.rowStyle }>TIMELINE</TableHeaderColumn>
              <TableHeaderColumn style={ styles.rowStyle }>TY SMAPE</TableHeaderColumn>
              <TableHeaderColumn style={ styles.rowStyle }>GOAL</TableHeaderColumn>
              <TableHeaderColumn style={ styles.rowStyle }>DIFF</TableHeaderColumn>
              <TableHeaderColumn style={ styles.rowStyle }>ACHIEVED</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { this.renderTableRows() }
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
