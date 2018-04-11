export default function(state = [], action) {
  switch (action.type) {
    case 'FILTER_CHANGED':
      console.log('Forecasts and Actuals');
      console.log(action.payload.data.forecastActualsAndSmape.forecastAndActuals);
      return action.payload.data.forecastActualsAndSmape.forecastAndActuals;
    default:
      return state;
  }
  return state;
}
