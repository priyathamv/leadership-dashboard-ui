import { combineReducers } from 'redux';
// import FiltersReducer from './filters_reducer';
import MultiFiltersReducer from './multi_filters_reducer';
import DmReducer from './dm_reducer';
import ActualForecastReducer from './actual_forecast_reducer';
import SmapeReducer from './smape_reducer';
import ErrorImpactReducer from './error_impact_reducer';
import Top20Reducer from './top20_reducer';

const rootReducer = combineReducers({
    // filters: FiltersReducer,
    multiFilters: MultiFiltersReducer,
    dmGoals: DmReducer,
    actualForecasts: ActualForecastReducer,
    smapeList: SmapeReducer,
    errorImpacts: ErrorImpactReducer,
    top20List: Top20Reducer,
})

export default rootReducer;
