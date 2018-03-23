import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import FilterList from '../containers/filter-list';
import DmTable from '../containers/dm_table';

import ActualForecast from '../containers/actual_forecast_graph';
import Smape from '../containers/smape_graph';

import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  tableDiv: {
    width: "40%",
    float: "left"
  },
  graphDiv: {
    width: "60%",
    float: "right"
  },
  filtersStyle: {
    height: "100px"
  }
};

const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar showMenuIconButton={false} title="Forecasting Analytics Dashboard - Store" />
      <FilterList/>
      <div style={styles.tableDiv}>
        <DmTable />
      </div>
      <div style={styles.graphDiv}>
        <ActualForecast />
        <Smape />
      </div>
    </div>
  </MuiThemeProvider>
);

export default App;
