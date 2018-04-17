const initialFilters = [
    {
      "name": "NODE",
      "currentValue": "STORE",
      "values": [ "STORE", "CORP" ]
    },
    {
      "name": "LT METRIC",
      "currentValue": "LEAD TIME",
      "values": [ "LEAD TIME", "ONE WEEK", "HORIZON" ]
    },
    {
      "name": "SALES_METRIC",
      "currentValue": "MINUS OUTS",
      "values": [ "MINUS OUTS", "MINUS OUTS & PROMO", "ALL INCLUDED" ]
    },
    {
      "name": "SALES > 6",
      "currentValue": "YES",
      "values": [ "YES", "ALL" ]
    },
    {
      "name": "SBU",
      "currentValue": "ALL",
      "values": [ "ALL" ]
    },
    {
      "name": "CBU",
      "currentValue": "ALL",
      "values": [ "ALL" ]
    },
    {
      "name": "BU",
      "currentValue": "ALL",
      "values": [ "ALL" ]
    },
    {
      "name": "DEPARTMENT",
      "currentValue": "ALL",
      "values": [ "ALL" ]
    },
    {
      "name": "DM",
      "currentValue": "ALL",
      "values": [ "ALL" ]
    },
    {
      "name": "CATEGORY",
      "currentValue": "ALL",
      "values": [ "ALL" ]
    }
  ]

export default function(state = initialFilters, action) {

  switch (action.type) {
    case 'FILTER_CHANGED':
      return action.payload.data.filters.filterObjects;
    default:
      return state;
  }

}
