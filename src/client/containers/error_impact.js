import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Treemap, Cell, Label, Tooltip, ResponsiveContainer } from 'recharts';

import CustomCell from '../components/treemap_cell';
import CustomTooltip from '../components/treemap_tooltip';

import * as filterFunctions from '../actions/filter_action';

import Spinner from '../components/spinner';

const styles = {
  headerStyle: {
    height: '47px',
    padding: '0 10px',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.1)',
    marginBottom: '1px',
    fontSize: '18px',
    verticalAlign: 'middle',
    lineHeight: '47px',
  },
  eiFrameStyle: {
    marginRight: '5px',
    position: 'relative',
  },
  spinnerStyle: {
    position: 'absolute',
    top: '50%',
    left: '41%',
  },
}

const temp = {
  name: "error impact",
  children: [
    {
      "category": "2258",
      "goal": 39.15,
      "twSmape": 49.94,
      "pwSmape": 47.75,
      "errorImpact": 41069.87,
      "_13WkForecast": 4412643.66
    },
    {
      "category": "2259",
      "goal": 51.99,
      "twSmape": 61.13,
      "pwSmape": 60.68,
      "errorImpact": 65556.81,
      "_13WkForecast": 8181947.23
    },
  ]
}

class ErrorImpact extends React.Component {

  constructor(props) {
    super(props);
  }

  handleCategoryClick(d) {
    this.props.waitForApiResponse();
    this.props.updateFilter(this.props.filters, { filterName: "CATEGORY", currentFilter: d.category });
  }

  render() {
    return (
      <div style={ styles.eiFrameStyle }>
        <div style={ styles.headerStyle }>CATEGORY SMAPE & ERROR IMPACT</div>
        <ResponsiveContainer width="100%" height={305}>
          <Treemap
            data={ this.props.errorImpacts }
            isAnimationActive={false}
            nameKey="category"
            dataKey="errorImpact"
            ratio={4 / 3}
            onClick={(d) => this.handleCategoryClick(d)}
            content={<CustomCell />}
          >
            <Tooltip content={ <CustomTooltip /> } />
          </Treemap>
        </ResponsiveContainer>
        { this.props.isLoading && <Spinner style={ styles.spinnerStyle } /> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorImpacts: state.errorImpacts.data,
    isLoading: state.errorImpacts.isLoading,
    filters: state.filters,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateFilter: filterFunctions.updateFilterForSummary,
                              waitForApiResponse: filterFunctions.waitForApiResponse,
                            }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorImpact);
