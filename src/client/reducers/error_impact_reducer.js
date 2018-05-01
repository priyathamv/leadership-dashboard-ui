const initialErrorImpacts = {
  isLoading: true,
  data: []
}

export default function(state = initialErrorImpacts, action) {
  switch (action.type) {
    case 'MULTI_FILTER_CHANGED':
      return Object.assign({}, { isLoading: false, data: action.payload.data.errorImpact });
    case 'WAIT_FOR_API_RESPONSE':
      return Object.assign(state, { isLoading: true });
    default:
      return state;
  }
  return state;
}
