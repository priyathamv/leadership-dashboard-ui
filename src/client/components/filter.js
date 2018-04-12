import React from 'react';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';


export default class Filter extends React.Component {

  state = {
    anchorEl: null,
    selectedIndex: 1
  }

  constructor(props) {
    super(props);
    // React components using ES6 classes no longer autobind this to non React methods
    //below statement just overwrites handleFilterChange function with the same function binded with `this` context
    this.handleClickListItem = this.handleClickListItem.bind(this)
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  renderFilterList() {
    return (
      this.props.filterObj.values.map((filterValue, index) => (
          <MenuItem
            key={filterValue}
            selected={index === this.state.selectedIndex}
            onClick={event => this.handleMenuItemClick(event, index)}
          >
            {filterValue}
          </MenuItem>
      ))
    )
  }

  handleClickListItem(event) {
    this.setState({ anchorEl: event.currentTarget });
    // this.props.filterChange({ filterName: this.props.filterObj.name,
    //                           currentFilter: value })
  }

  handleMenuItemClick(event, index) {
    this.setState({ selectedIndex: index, anchorEl: null });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label={this.props.filterObj.name}
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={this.props.filterObj.name}
              secondary={options[this.state.selectedIndex]}
            />
          </ListItem>
        </List>

        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.renderFilterList()}
        </Menu>
      </div>
    )
  }
}



// import React from 'react';
//
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
// import Subheader from 'material-ui/Subheader';
//
// const styles = {
//   headerStyle: {
//     height: '35px'
//   }
// }
//
// export default class Filter extends React.Component {
//   constructor(props) {
//     super(props);
//     // React components using ES6 classes no longer autobind this to non React methods
//     //below statement just overwrites handleFilterChange function with the same function binded with `this` context
//     this.handleFilterChange = this.handleFilterChange.bind(this)
//   }
//
//   renderFilterList() {
//     return (
//       this.props.filterObj.values.map((filterValue) => {
//         return (
//           <MenuItem key={filterValue} value={filterValue} primaryText={filterValue} />
//         )
//       })
//     )
//   }
//
//   handleFilterChange(event, index, value) {
//     this.props.filterChange({ filterName: this.props.filterObj.name,
//                               currentFilter: value })
//   }
//
//   render() {
//     return (
//       <div>
//         <Subheader style={styles.headerStyle}>{this.props.filterObj.name}</Subheader>
//         <DropDownMenu selectedMenuItemStyle={{ color: '#00BCD4' }} value={this.props.filterObj.currentValue} onChange={this.handleFilterChange}>
//           {this.renderFilterList()}
//         </DropDownMenu>
//       </div>
//     )
//   }
// }
