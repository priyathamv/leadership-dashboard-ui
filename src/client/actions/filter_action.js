import axios from 'axios';

export default function updateFilter(currentFilters, updatedFilter) {

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

  if(updatedFilter && ( updatedFilter.filterName == "NODE" ||
                        updatedFilter.filterName == "LT METRIC" ||
                        updatedFilter.filterName == "SALES METRIC" ||
                        updatedFilter.filterName == "SALES > 6") ) {
    node        = currentFilters[0].currentValue;
    ltMetric    = currentFilters[1].currentValue;
    salesMetric = currentFilters[2].currentValue;
    salesGt6    = currentFilters[3].currentValue;
    sbu         = currentFilters[4].currentValue;
    cbu         = currentFilters[5].currentValue;
    bu          = currentFilters[6].currentValue;
    department  = currentFilters[7].currentValue;
    dm          = currentFilters[8].currentValue;
    category    = currentFilters[9].currentValue;
  } else {
    node        = currentFilters[0].currentValue;
    ltMetric    = currentFilters[1].currentValue;
    salesMetric = currentFilters[2].currentValue;
    salesGt6    = currentFilters[3].currentValue;
  }

  if(updatedFilter){
    const changedFilter = encodeURIComponent(updatedFilter.currentFilter);
    switch (updatedFilter.filterName) {
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

  const request_url = `${API_URL}/api/dm-goals?node=${node}&ltMetric=${ltMetric}&salesMetric=${salesMetric}&salesGt6=${salesGt6}&sbu=${sbu}&cbu=${cbu}&bu=${bu}&department=${department}&dm=${dm}&category=${category}`;
  console.log(request_url);
  const filtersPromise = axios.get(request_url);

  return {
    type: 'FILTER_CHANGED',
    payload: filtersPromise
  };
}
