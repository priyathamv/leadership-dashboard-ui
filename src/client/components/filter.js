import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  activeColor: {
    color: '#00BCD4'
  }
}

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    // React components using ES6 classes no longer autobind this to non React methods
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

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText={ this.props.filterObj.name }
          value={ this.props.filterObj.currentValue }
          onChange={ this.handleFilterChange }
          selectedMenuItemStyle={ styles.activeColor }
        >
          {this.renderFilterList()}
        </SelectField>
      </div>
    )
  }
}
