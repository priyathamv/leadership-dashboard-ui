import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { GridList, GridTile } from 'material-ui/GridList';

import * as filterFunctions from '../actions/filter_action';
import Filter from '../components/filter';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: '80px',
    margin: '5px 0',
    boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.1)',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: '#FFFFFF',
    margin: '0',
  },
  filterStyle: {
    padding: '0 5px',
  },
};

class FilterList extends React.Component {

  // TODO: CHECK IF WE CAN DO THIS INITIAL CALL HERE!!!!
  componentWillMount() {
    this.props.updateFilterSummary(this.props.filters);
    this.props.updateFilterTop20(this.props.filters);
  }

  renderFilterList(filters) {
    return (
      filters.map((filterObj) => {
        return (
          <GridTile key={ filterObj.name } style={ styles.filterStyle } >
            <Filter
              key={ filterObj.name }
              filterChange={ (updatedFilter) => {
                this.props.updateFilterSummary(this.props.filters, updatedFilter)
                this.props.updateFilterTop20(this.props.filters, updatedFilter)
              } }
              filterObj={ filterObj } >
            </Filter>
          </GridTile>
        )
      })
    )
  }

  render() {
    return (
      <div style={ styles.root }>
        <GridList style={ styles.gridList } cols={10}>
          { this.renderFilterList(this.props.filters) }
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
  return bindActionCreators({ updateFilterSummary: filterFunctions.updateFilterForSummary,
                              updateFilterTop20: filterFunctions.updateFilterForTop20,
                            }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);
