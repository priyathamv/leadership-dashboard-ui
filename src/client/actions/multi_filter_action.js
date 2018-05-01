import axios from 'axios';

export function updateFilterForSummary(currentFilters, updatedFilter) {
  console.log(currentFilters, updatedFilter);
  const queryParams     = getQueryParams(currentFilters, updatedFilter);
  const request_url     = `${API_URL}/api/dm-goals?${queryParams}`;
  const summaryPromise  = axios.get(request_url);

  console.log("Summary api URL(Multi)", request_url);
  return {
    type: 'MULTI_FILTER_CHANGED',
    payload: summaryPromise,
  };
}

export function updateFilterForTop20(currentFilters, updatedFilter) {
  const queryParams     = getQueryParams(currentFilters, updatedFilter);
  const request_url     = `${API_URL}/api/top-20?${queryParams}`;
  const top20Promise    = axios.get(request_url);

  console.log("Top20 api URL", request_url);
  return {
    type: 'FILTER_CHANGED_TOP20',
    payload: top20Promise,
  };
}

export function waitForApiResponse() {
  return {
    type: 'WAIT_FOR_API_RESPONSE'
  }
}

function joinFilterList(filterObject) {
  return (typeof filterObject.value === 'string') ?
          filterObject.value :
          filterObject.value.map(valueObj => valueObj.value).join("|");
}

function getQueryParams(currentFilters, updatedFilter) {
  var node        = "STORE",
      ltMetric    = "LEAD TIME",
      salesMetric = "MINUS OUTS",
      salesGt6    = "YES",
      sbu         = "ALL",
      cbu         = "ALL",
      bu          = "ALL",
      department  = "ALL",
      dm          = "ALL",
      category    = "ALL";

  // TODO: Lot of refactoring required in here!
  // console.log("updatedFilter", updatedFilter);
  if(updatedFilter && ( updatedFilter.name == "NODE" ||
                        updatedFilter.name == "LT METRIC" ||
                        updatedFilter.name == "SALES METRIC" ||
                        updatedFilter.name == "SALES > 6") ) {
    node        = joinFilterList(currentFilters[0]);
    ltMetric    = joinFilterList(currentFilters[1]);
    salesMetric = joinFilterList(currentFilters[2]);
    salesGt6    = joinFilterList(currentFilters[3]);
    sbu         = joinFilterList(currentFilters[4]);
    cbu         = joinFilterList(currentFilters[5]);
    bu          = joinFilterList(currentFilters[6]);
    department  = joinFilterList(currentFilters[7]);
    dm          = joinFilterList(currentFilters[8]);
    category    = joinFilterList(currentFilters[9]);
  } else {
    node        = joinFilterList(currentFilters[0]);
    ltMetric    = joinFilterList(currentFilters[1]);
    salesMetric = joinFilterList(currentFilters[2]);
    salesGt6    = joinFilterList(currentFilters[3]);
  }

  if(updatedFilter){
    const changedFilter = encodeURIComponent(updatedFilter.value);
    switch (updatedFilter.name) {
      case "NODE":
        node = changedFilter;
        break;
      case "LT METRIC":
        ltMetric = changedFilter;
        break;
      case "SALES METRIC":
        salesMetric = changedFilter;
        break;
      case "SALES > 6":
        salesGt6 = changedFilter;
        break;
      case "SBU":
        sbu = changedFilter;
        break;
      case "CBU":
        cbu = changedFilter;
        break;
      case "BU":
        bu = changedFilter;
        break;
      case "DEPARTMENT":
        department = changedFilter;
        break;
      case "DM":
        dm = changedFilter;
        break;
      case "CATEGORY":
        category = changedFilter;
        break;
      default:
    }
  }
  return `node=${node}&ltMetric=${ltMetric}&salesMetric=${salesMetric}&salesGt6=${salesGt6}&sbu=${sbu}&cbu=${cbu}&bu=${bu}&department=${department}&dm=${dm}&category=${category}`;
}
