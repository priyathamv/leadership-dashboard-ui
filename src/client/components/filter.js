import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

const styles = {
  headerStyle: {
    height: '35px'
  }
}

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    // React components using ES6 classes no longer autobind this to non React methods
    //below statement just overwrites handleFilterChange function with the same function binded with `this` context
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  renderFilterList() {
    return (
      this.props.filterObj.values.map((filterValue) => {
        return (
          <MenuItem key={filterValue} value={filterValue} primaryText={filterValue} />
        )
      })
    )
  }

  handleFilterChange(event, index, value) {
    this.props.filterChange({ filterName: this.props.filterObj.name,
                              currentFilter: value })
  }
  // <MenuItem key="ALL" value="ALL" primaryText="ALL" />
  render() {
    return (
      <div>
        <Subheader style={styles.headerStyle}>{this.props.filterObj.name}</Subheader>
        <DropDownMenu selectedMenuItemStyle={{ color: '#00BCD4' }} value={this.props.filterObj.currentValue} onChange={this.handleFilterChange}>
          {this.renderFilterList()}
        </DropDownMenu>
      </div>
    )
  }
}
