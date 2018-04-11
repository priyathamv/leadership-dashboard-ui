const initialDmPerformances = [
      {
        "name": "Cur Wk",
        "tySmape": 0.0,
        "goal": 0.0,
        "difference": 0.0,
        "achieved": true
      },
      {
        "name": "Prev Wk",
        "tySmape": 0.0,
        "goal": 0.0,
        "difference": 0.0,
        "achieved": true
      },
      {
        "name": "Prev Qtr",
        "tySmape": 0.0,
        "goal": 0.0,
        "difference": 0.0,
        "achieved": true
      },
      {
        "name": "Prev Yr",
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
