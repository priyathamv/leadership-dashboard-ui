const initialFilters = [
    {
      "name": "NODE",
      "value": [ {value: "STORE", } ],
      "values": [ "STORE", "CORP" ]
    },
    {
      "name": "LT METRIC",
      "value": [ {value: "LEAD TIME", } ],
      "values": [ "LEAD TIME", "ONE WEEK", "HORIZON" ]
    },
    {
      "name": "SALES METRIC",
      "value": [ {value: "MINUS OUTS", } ],
      "values": [ "MINUS OUTS", "MINUS OUTS & PROMO", "ALL INCLUDED" ]
    },
    {
      "name": "SALES > 6",
      "value": [ {value: "YES", } ],
      "values": [ "YES", "ALL" ]
    },
    {
      "name": "SBU",
      "value": [ {value: "ALL", }, ],
      "values": [
          "ALL",
          "CONSUMABLES H & W",
          "FOOD",
          "GENERAL MERCHANDISE"
        ]
    },
    {
      "name": "CBU",
      "value": [ { value: "ALL", }, ],
      "values": [
          "ALL",
          "CONSUMABLES",
          "FRESH",
          "H & W",
          "HARDLINES & ENTERTAINMENT",
          "HOME & APPAREL",
          "PACKAGED GOODS & SBI"
        ]
    },
    {
      "name": "BU",
      "value": [ { value: "ALL", }, ],
      "values": [
          "ALL",
          "APPAREL",
          "CONSUMABLES",
          "ENTERTAINMENT, TOYS, & SEASONAL",
          "FRESH",
          "H & W",
          "HARDLINES",
          "HOME",
          "PACKAGED GOODS",
          "SBI"
        ]
    },
    {
      "name": "DEPARTMENT",
      "value": [ { value: "ALL", }, ],
      "values": [
          "ALL",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "16",
          "17",
          "18",
          "19",
          "20",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "38",
          "40",
          "42",
          "44",
          "46",
          "47",
          "48",
          "49",
          "52",
          "55",
          "56",
          "60",
          "67",
          "71",
          "72",
          "74",
          "79",
          "80",
          "81",
          "82",
          "87",
          "90",
          "91",
          "92",
          "93",
          "94",
          "95",
          "96",
          "97",
          "98"
        ]
    },
    {
      "name": "DM",
      "value": [ { value: "ALL", }, ],
      "values": [
          "ALL",
          "ANDREA BLUME",
          "ANDREW BRAITHWAITE",
          "ASHLEY BRUMMETTE",
          "BENJI ENSSLE",
          "BILLY MCENTIRE",
          "BJARNI MAGNUSSON",
          "BONNIE WHITE",
          "BRANDI ROLAND",
          "BRANDI WILLIS",
          "BRANDON BAUER",
          "BRANDY SCOTT",
          "CASS TRUMBO",
          "CHARLES HACKNEY",
          "CHRIS MAGEE",
          "CHUCK REED",
          "D81",
          "DAVID PETERSON",
          "DAVID SPENCER",
          "DENNIS ASKEW II",
          "EDWIN AYALA",
          "GREG GOWER",
          "HAYLEY KNIFE-CHIEF",
          "JARROD ANDERSON",
          "JEREMY MOSER",
          "JOHN SNOW",
          "JORDAN JACKSON",
          "JOSH LEFTWICH",
          "JOSHUA MOSELEY",
          "JULIE WARREN",
          "JUSTIN BELL",
          "KATIE CHAPMAN",
          "KYLE QUIGLEY",
          "LINDSAY HOVER",
          "MARY BETH ASH",
          "MATT BERGGREN",
          "MATTHEW OSHAUGNESSEY",
          "MICAH NICHOLS",
          "MICHAEL PATRICK",
          "MICHELLE CHEESMAN",
          "MIKE TULLY",
          "NICK DAILEY",
          "REBECCA CUNNINGHAM",
          "ROB MORRISON",
          "ROBERT GARDNER",
          "RYAN SHANNON",
          "WILLIAM WESSELS"
        ]
    },
    {
      "name": "CATEGORY",
      "value": [ { value: "ALL", }, ],
      "values": [
          "ALL",
          "0-*UNASSIGNED",
          "1005-DINNERWARE",
          "1006-FLATWARE",
          "1007-DRINKWARE",
          "101-NON-PACKAGED UNDERWEAR",
          "10116-SPARERIBS AND BACKRIBS",
          "10122-MISSY CONTEMPORARY",
          "10123-APP GAMING AND STRATEGY GUIDES",
          "10151-WATERING",
          "10152-TRIMMERS AND ACCESSORIES",
          "10153-PUSH MOWERS",
          "103-TRADITIONAL SLEEPWEAR",
          "105-LICENSED SLEEPWEAR1",
          "106-SCRUBS",
          "10764-GARDENING",
        ]
    }
  ]

function sortDeptAndCatFilters(filterObjects) {
  const filterObjs = Object.assign([], filterObjects);
  for(var i=0; i<filterObjs.length; i++){
    if(filterObjs[i].name == "DEPARTMENT" || filterObjs[i].name == "CATEGORY"){
      filterObjs[i].values = filterObjs[i].values.filter(function(item) {
                                return item !== "ALL";
                              });
      filterObjs[i].values.splice(0, 0, "ALL"); //(index, no_of_elems_to_delete, elem_to_insert)
    }
  }
  return filterObjs;
}

export default function(state = initialFilters, action) {

  switch (action.type) {
    case 'MULTI_FILTER_CHANGED':
      console.log("Summary response ", action.payload.data);
      return sortDeptAndCatFilters(action.payload.data.filters.filterObjects);
    default:
      return state;
  }

}
