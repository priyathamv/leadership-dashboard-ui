import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { GridList, GridTile } from 'material-ui/GridList';

import updateFilter from '../actions/filter_action';
import Filter from '../components/filter';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: '75px',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  filterStyle: {
    padding: '0 10px',
  }
};

class FilterList extends React.Component {

  // TODO: CHECK IF WE CAN DO THIS INITIAL CALL HERE!!!!
  componentWillMount() {
    this.props.updateFilter(this.props.filters)
  }

  renderFilterList(filters) {
    return (
      filters.map((filterObj) => {
        return (
          <GridTile key={filterObj.name} style={styles.filterStyle} >
            <Filter key={filterObj.name} filterChange={(updatedFilter) => this.props.updateFilter(this.props.filters, updatedFilter)} filterObj={filterObj}></Filter>
          </GridTile>
        )
      })
    )
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList style={styles.gridList} cols={10}>
          {this.renderFilterList(this.props.filters)}
        </GridList>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filters
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateFilter: updateFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);
