import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';

import MultiFilter from '../components/multi-filter';
import * as multiFilterFunctions from '../actions/multi_filter_action';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: '65px',
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
  resetFilters: {
    position: 'absolute',
    right: '35px',
    top: '134px',
    borderRadius: '0 0 10px 10px',
    height: '20px',
    zIndex: '100',
  },
  resetLabel: {
    fontSize: '9px',
    padding: '0px',
  },
  resetButton: {
    backgroundColor: '#79D7E5',
    borderRadius: '0 0 10px 10px',
    height: '20px',
  }
};

class MultiFilterList extends React.Component {

  // TODO: CHECK IF WE CAN DO THIS INITIAL CALL HERE!!!!
  componentWillMount() {
    this.props.updateFilterSummary(this.props.filters);
    this.props.updateFilterTop20(this.props.filters);
  }

  // joinFilterList(filterObject) {
  //   return (typeof filterObject.value === 'string') ?
  //           filterObject.value :
  //           filterObject.value.map(valueObj => valueObj.value).join("|");
  // }

  handleFilterChange(updatedFilter) {
    // var newFilters = this.props.filters.map(curFilter => {
    //   return Object.assign(curFilter, { value: this.joinFilterList(curFilter) })
    // });
    this.props.waitForApiResponse();
    this.props.updateFilterSummary(this.props.filters, updatedFilter);
    this.props.updateFilterTop20(this.props.filters, updatedFilter);
    this.forceUpdate();
  }

  renderMultiFilterList(filters) {
    return (
      filters.map((filterObj) => {
        return (
          <GridTile key={ filterObj.name } style={ styles.filterStyle } >
            <MultiFilter key={ filterObj.name }
              filterChange={ (updatedFilter) => this.handleFilterChange(updatedFilter) }
              filterObj={ filterObj } >
            </MultiFilter>
          </GridTile>
        )
      })
    )
  }

  render() {
    return (
      <div style={ styles.root }>
        <GridList style={ styles.gridList } cols={10}>
          { this.renderMultiFilterList(this.props.filters) }
        </GridList>
        <RaisedButton label="Reset filters"
                      href="/"
                      primary={ true }
                      style={ styles.resetFilters }
                      buttonStyle={ styles.resetButton }
                      labelStyle={ styles.resetLabel } />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    filters: state.multiFilters
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateFilterSummary: multiFilterFunctions.updateFilterForSummary,
                              updateFilterTop20: multiFilterFunctions.updateFilterForTop20,
                              waitForApiResponse: multiFilterFunctions.waitForApiResponse,
                            }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiFilterList);
