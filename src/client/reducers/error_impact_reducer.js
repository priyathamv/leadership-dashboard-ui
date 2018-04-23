const initialErrorImpacts = {
  isLoading: true,
  data: []
}

export default function(state = initialErrorImpacts, action) {
  switch (action.type) {
    case 'FILTER_CHANGED':
      return Object.assign({}, { isLoading: false, data: action.payload.data.errorImpact });
    default:
      return state;
  }
  return state;
}
