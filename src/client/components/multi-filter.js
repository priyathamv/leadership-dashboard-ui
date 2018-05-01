import React from 'react';

import SuperSelectField from 'material-ui-superselectfield';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import { teal500, pink500, teal200, pink200, yellow500, yellow200, deepPurple500 } from 'material-ui/styles/colors';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import CheckedIcon from 'material-ui/svg-icons/navigation/check';
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';

const styles = {
  rootStyle: {
    width: '200px',
    marginTop: '20px',
    fontSize: '12px',
    padding: '5px',
  },
  floatLabel: {
    fontSize: '15px',
    color: '#848484',
  },
  floatLabelFocus: {
    color: '#6E6E6E',
  },
  menuItem: {
    fontSize: '12px',
    padding: '7px 15px 7px 40px',
  },
  menuItemSelected: {
    color: '#00BCD4',
    backgroundColor: '#FFFFFF',
  },
  selectedItemStyle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100px',
    minWidth: '100px',
  },
  selectAll: {
    whiteSpace: 'nowrap',
    fontSize: '12px',
  },
  anchorStyle: {
    vertical: 'bottom',
    horizontal: 'left'
  },
  menuItemSingle: {
    fontSize: '12px',
    padding: '7px 15px',
  },
}

const singleFilterNames = [ "NODE", "LT METRIC", "SALES METRIC", "SALES > 6" ];

export default class MultiFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterObj: this.props.filterObj
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filterObj: nextProps.filterObj });
  }
  handleSelect = (values, name) => {
    // if no filter is selected or ALL filter is selected
    if(values.length == 0 || values[values.length-1].value == "ALL") {
      this.setState({
        filterObj: Object.assign(this.state.filterObj, { value: [{value: "ALL"}] })
      });
      this.forceUpdate();
    } else if(values.length > 1){
        for(var i=0; i<values.length; i++){
          if(values[i].value == "ALL"){
            values.splice(i, 1);
            this.setState({
              filterObj: Object.assign(this.state.filterObj, {value: values})
            });
            this.forceUpdate();
            break;
          }
        }
      }
  }

  isMultiSelect = () => {
    return singleFilterNames.indexOf(this.state.filterObj.name) == -1
  }

  handleChange = (newFilterValues, name) => {
    var isFilterChanged = false;
    const oldFilterValues = this.props.filterObj.valueAsListOfStrings;

    if (newFilterValues.value) {
      isFilterChanged =  !(newFilterValues.value && oldFilterValues.length && newFilterValues.value == oldFilterValues[0]);
    } else {
      isFilterChanged = !(newFilterValues.length == oldFilterValues.length);
      for(var property in newFilterValues){
        if( !(oldFilterValues.indexOf(newFilterValues[property].value) > -1) ){
          isFilterChanged = true;
          break;
        }
      }
    }

    if(isFilterChanged){
      var currentFilter;
      if (newFilterValues.value) // Single select
        currentFilter = newFilterValues.value;
      else if (newFilterValues.length == 0) // No option selected (ALL default)
        currentFilter = "ALL";
      else
        currentFilter = newFilterValues.map(valueObj => valueObj.value).join("|");
      this.props.filterChange({ name: name,
                                value: currentFilter });
    }
  }

  selectionRendererDiv = (values, hintText) => {
    return (
      <div style={ styles.selectedItemStyle } >
        { this.selectionRenderer(values, hintText) }
      </div>
    )
  }

  selectionRenderer = (values, hintText) => {
    if (singleFilterNames.indexOf(hintText) == -1) { // MultiSelect filter
      switch (values.length) {
        case 0:
          return '';
        case 1:
          return values[0].value;
        default:
          return `${values.length} options selected`;
      }
    } else // SingleSelect filter
      return values[0] ? values[0].value : values.value;
  }

  render() {
    const dataSourceNodes   = this.state.filterObj.values.map((filterValue) => (
      <div key={ filterValue } value={ filterValue } >
        { filterValue }
      </div>
    ));

    const FloatingLabel     = ( <span>{this.state.filterObj.name}</span> );
    const AutocompleteText  = ( <span>Search..</span> );

    return (
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <SuperSelectField
          name={ this.state.filterObj.name }
          multiple={ this.isMultiSelect() }
          withResetSelectAllButtons

          floatingLabel={ FloatingLabel }
          floatingLabelStyle={ styles.floatLabel }
          floatingLabelFocusStyle={ styles.floatLabelFocus }

          innerDivStyle={ this.isMultiSelect() ? styles.menuItem : styles.menuItemSingle }
          selectedMenuItemStyle={ styles.menuItemSelected }

          popoverWidth={ 200 }
          popoverClassName="filter-popover"

          nb2show={ 10 }
          hintText={ this.state.filterObj.name }

          selectAllButton={ <FlatButton label='select all' hoverColor='rgba(69, 90, 100, 0.1)' labelStyle={ styles.selectAll } fullWidth /> }
          resetButton={ <FlatButton label='reset' hoverColor='rgba(69, 90, 100, 0.1)' labelStyle={ styles.selectAll } fullWidth /> }

          canAutoPosition={ true }
          checkPosition="left"
          checkedIcon={ <CheckedIcon style={{ top: 'calc(50% - 12px)', marginLeft: '5px', }} /> }
          unCheckedIcon={ <UnCheckedIcon style={{ top: 'calc(50% - 12px)', marginLeft: '5px', }} /> }

          hintTextAutocomplete={ AutocompleteText }
          onChange={ this.handleChange }
          onSelect={ this.handleSelect }
          onAutoCompleteTyping={ this.handleAutoCompleteTyping }
          value={ this.state.filterObj.value }
          hoverColor='rgba(3, 169, 244, 0.15)'
          anchorOrigin={ styles.anchorStyle }
          style={ styles.rootStyle }
          menuCloseButton={<FlatButton label='Apply' hoverColor='rgba(3, 169, 244, 0.15)' labelStyle={ styles.selectAll } />}
          dropDownIcon={<ArrowDown />}
          selectionsRenderer={ this.selectionRendererDiv }
        >
          {dataSourceNodes}
        </SuperSelectField>
      </div>

    )
  }
}
