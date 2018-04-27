const initialDmPerformances = {
  isLoading: true,
  data: [
      {
        "name": "CUR WEEK",
        "tySmape": 0.0,
        "goal": 0.0,
        "difference": 0.0,
        "achieved": true
      },
      {
        "name": "PREV WEEK",
        "tySmape": 0.0,
        "goal": 0.0,
        "difference": 0.0,
        "achieved": true
      },
      {
        "name": "PREV QRTR",
        "tySmape": 0.0,
        "goal": 0.0,
        "difference": 0.0,
        "achieved": true
      },
      {
        "name": "PREV YEAR",
        "tySmape": 0.0,
        "goal": 0.0,
        "difference": 0.0,
        "achieved": true
      }
    ]
  }

export default function(state = initialDmPerformances, action) {
  switch (action.type) {
    case 'FILTER_CHANGED':
      return Object.assign({}, { isLoading: false, data: action.payload.data.dmGoals.dmPerformances });
    case 'WAIT_FOR_API_RESPONSE':
      return Object.assign(state, { isLoading: true });
    default:
      return state;
  }
  return state;
}
