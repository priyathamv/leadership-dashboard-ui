const initialDmPerformances = [
      {
        "name": "Current Week",
        "tySmape": 0.0,
        "goal": 0.0,
        "difference": 0.0,
        "achieved": true
      },
      {
        "name": "Previous Week",
        "tySmape": 0.0,
        "goal": 0.0,
        "difference": 0.0,
        "achieved": true
      },
      {
        "name": "Previous Qtr",
        "tySmape": 0.0,
        "goal": 0.0,
        "difference": 0.0,
        "achieved": true
      },
      {
        "name": "Previous Year",
        "tySmape": 0.0,
        "goal": 0.0,
        "difference": 0.0,
        "achieved": true
      }
    ]

export default function(state = initialDmPerformances, action) {
  switch (action.type) {
    case 'FILTER_CHANGED':
      return action.payload.data.dmGoals.dmPerformances;
    default:
      return state;
  }
  return state;
}
