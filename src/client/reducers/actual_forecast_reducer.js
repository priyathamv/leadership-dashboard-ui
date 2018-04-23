export default function(state = [], action) {
  switch (action.type) {
    case 'FILTER_CHANGED':
      console.log(action.payload.data);
      return action.payload.data.forecastActualsAndSmape.forecastAndActuals;
    default:
      return state;
  }
  return state;
}
