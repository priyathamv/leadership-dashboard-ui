import { combineReducers } from 'redux';
import FiltersReducer from './filters_reducer';
import DmReducer from './dm_reducer';
import ActualForecastReducer from './actual_forecast_reducer';
import SmapeReducer from './smape_reducer';
import ErrorImpactReducer from './error_impact_reducer';

const rootReducer = combineReducers({
    filters: FiltersReducer,
    dmGoals: DmReducer,
    actualForecasts: ActualForecastReducer,
    smapeList: SmapeReducer,
    errorImpacts: ErrorImpactReducer,
})

export default rootReducer;
