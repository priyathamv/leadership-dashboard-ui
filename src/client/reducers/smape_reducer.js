export default function(state = [], action) {
  switch (action.type) {
    case 'MULTI_FILTER_CHANGED':
      return action.payload.data.forecastActualsAndSmape.smapes;
    default:
      return state;
  }
  return state;
}
