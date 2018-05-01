import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import WalmartLogo from './walmart_logo';

import FilterList from '../containers/filter-list';
import MultiFilterList from '../containers/multi-filter-list';
import DmTable from '../containers/dm_table';
import ActualForecast from '../containers/actual_forecast_graph';
import Smape from '../containers/smape_graph';
import ErrorImpact from '../containers/error_impact';
import Top20 from '../containers/top20';
import Footer from './footer';

import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  container: {
    margin: '0 25px',
  },
  filtersStyle: {
    height: "100px"
  },
  dmTableDiv: {
    width: "40%",
    display: "inline-block",
  },
  graphDiv: {
    width: "60%",
    display: "inline-block",
  },
  errorImpactDiv: {
    width: "55%",
    height: "300px",
    display: "inline-block",
  },
  Top20Div: {
    width: "45%",
    display: "inline-block",
  },
};
// <FilterList />
const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar
        iconElementLeft={ <IconButton><WalmartLogo /></IconButton> }
        title="Forecasting Analytics Dashboard - Store"
      />
      <div style={ styles.container } >
        <MultiFilterList />
        <div id="dmTableDiv" style={ styles.dmTableDiv }>
          <DmTable />
        </div>
        <div id="graphDiv" style={ styles.graphDiv }>
          <ActualForecast />
          <Smape />
        </div>
        <div id="errorImpactDiv" style={ styles.errorImpactDiv }>
          <ErrorImpact />
        </div>
        <div id="top20Div" style={ styles.Top20Div }>
          <Top20 />
        </div>
      </div>
      <Footer />
    </div>
  </MuiThemeProvider>
);

export default App;
