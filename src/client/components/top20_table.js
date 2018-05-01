import React from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const styles = {
  tableStyle: {
    boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.1)',
    height: '305px',
    overflowX: 'auto',
  },
  rowStyle: {
    height: '40px',
    padding: '5px 10px',
  },
}

export default class Top20Table extends React.Component {
  constructor(props) {
    super(props);
  }

  commaSeperatedValue(bigValue) {
    var bigValueStr = "" + bigValue;
    var finalValue  = "";
    var count = 0;
    for(var i=bigValueStr.length-1; i>=0; i--){
      if(count !=0 && count % 3 == 0)
        finalValue = "," + finalValue;
      finalValue = bigValueStr[i] + finalValue;
      count++;
    }
    return finalValue;
  }

  renderTop20Rows(top20List) {
    return (
      top20List.map(top20Record => {
        return (
          <TableRow style={ styles.rowStyle }>
            <TableRowColumn style={ styles.rowStyle } style={{width: '35%'}} >
              <span className="tooltip">{ top20Record.description }
                <div className="tooltiptext">{ top20Record.description }</div>
              </span>
            </TableRowColumn>

            <TableRowColumn style={ styles.rowStyle }>
              <span>{ top20Record.smape }%</span>
            </TableRowColumn>

            <TableRowColumn style={ styles.rowStyle }>
              <span>{ this.commaSeperatedValue(top20Record.sales) }</span>
            </TableRowColumn>

            <TableRowColumn style={ styles.rowStyle }>
              <span>{ this.commaSeperatedValue(top20Record.forecast) }</span>
            </TableRowColumn>
          </TableRow>
        )
      })
    )
  }
  render() {
    return (
      <Table wrapperStyle={ styles.tableStyle }>
        { this.props.top20List.length &&
          <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
            <TableRow style={ styles.rowStyle }>
              <TableHeaderColumn style={ styles.rowStyle } style={{width: '35%'}} >DESCRIPTION</TableHeaderColumn>
              <TableHeaderColumn style={ styles.rowStyle }>SMAPE</TableHeaderColumn>
              <TableHeaderColumn style={ styles.rowStyle }>SALES CALC</TableHeaderColumn>
              <TableHeaderColumn style={ styles.rowStyle }>FORECAST CALC</TableHeaderColumn>
            </TableRow>
          </TableHeader>
        }
        <TableBody displayRowCheckbox={ false } >
          {this.renderTop20Rows(this.props.top20List)}
        </TableBody>
      </Table>
    )
  }
}
