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

import { Tabs, Tab } from 'material-ui/Tabs';

import Top20Table from '../components/top20_table';
import Spinner from '../components/spinner';

const styles = {
  top20Frame: {
    height: '353px',
  },
  tableStyle: {
    boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.1)',
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
  headerStyle: {
    height: '40px',
    padding: '10px 10px 0px 10px',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.1)',
    marginBottom: '1px',
    fontSize: '18px',
  }
}

class Top20 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      tabIndex: value,
    });
  };

  render() {
    console.log("this.props.top20List");
    console.log(this.props.top20List);
    return (
      <div style={ styles.top20Frame }>
        <Tabs value={ this.state.tabIndex } onChange={ this.handleChange }>
          <Tab label="TOP 20 SUBCATEGORY" value={0}>
            <Top20Table top20List={ this.props.top20List.cidTop20List } />
          </Tab>

          <Tab label="TOP 20 FINELINE" value={1}>
            <Top20Table top20List={ this.props.top20List.finelineTop20List } />
          </Tab>

          <Tab label="TOP 20 CID" value={2}>
            <Top20Table top20List={ this.props.top20List.subcatTop20List } />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    top20List: state.top20List
  }
}

export default connect(mapStateToProps, null)(Top20);
