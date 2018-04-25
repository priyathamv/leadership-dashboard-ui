const initialTop20Data = {
  "cidTop20List": [],
  "finelineTop20List": [],
  "subcatTop20List": [],
}

export default function(state = initialTop20Data, action) {
  switch (action.type) {
    case 'FILTER_CHANGED_TOP20':
      console.log(action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
  return state;
}
