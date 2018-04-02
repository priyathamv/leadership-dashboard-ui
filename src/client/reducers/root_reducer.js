import { combineReducers } from 'redux';
import FiltersReducer from './filters_reducer';
import DmReducer from './dm_reducer';
import ActualForecastReducer from './actual_forecast_reducer';
import SmapeReducer from './smape_reducer';

const rootReducer = combineReducers({
    filters: FiltersReducer,
    dmGoals: DmReducer,
    actualForecasts: ActualForecastReducer,
    smapeList: SmapeReducer
})

export default rootReducer;
