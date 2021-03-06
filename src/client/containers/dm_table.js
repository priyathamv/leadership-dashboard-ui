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
    height: '40px',
    padding: '5px 10px',
  },
  firstColumnStyle: {
    height: '40px',
    padding: '5px 10px',
    width: '8em',
    minWidth: '8em',
    maxWidth: '8em',
    wordBreak: 'break-all',
  },
  headerStyle: {
    height: '47px',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.1)',
    marginBottom: '1px',
    fontSize: '18px',
    lineHeight: '47px',
    verticalAlign: 'middle',
    padding: '0 10px',
  }
}

class DmTable extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   isLoading: true
    // }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ isLoading: false });
  // }

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
        <div style={ styles.headerStyle }>DM PERFORMANCE (Current Week - 11813)</div>

        <Table wrapperStyle={ styles.tableStyle }>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={ styles.rowStyle }>
              <TableHeaderColumn style={ styles.firstColumnStyle }>TIMELINE</TableHeaderColumn>
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
