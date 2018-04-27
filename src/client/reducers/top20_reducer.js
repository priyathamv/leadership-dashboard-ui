const initialTop20Data = {
  "isLoading": true,
  "cidTop20List": [],
  "finelineTop20List": [],
  "subcatTop20List": [],
}

export default function(state = initialTop20Data, action) {
  switch (action.type) {
    case 'FILTER_CHANGED_TOP20':
      console.log("Top20 response: ", action.payload.data);
      return Object.assign(action.payload.data, { isLoading: false });
    case 'WAIT_FOR_API_RESPONSE':
      return Object.assign(state, { isLoading: true });
    default:
      return state;
  }
  return state;
}
