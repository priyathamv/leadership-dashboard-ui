import axios from 'axios';

export default function updateFilter(currentFilters, updatedFilter) {

  var node        = "STORE",
      metric      = "LEAD TIME",
      sbu         = "ALL",
      cbu         = "ALL",
      bu          = "ALL",
      department  = "ALL",
      dm          = "ALL",
      category    = "ALL";

  console.log(currentFilters, updatedFilter);

  if(updatedFilter && (updatedFilter.filterName == "NODE" || updatedFilter.filterName == "LT METRIC")) {
    node        = currentFilters[0].currentValue;
    metric      = currentFilters[1].currentValue;
    sbu         = currentFilters[2].currentValue;
    cbu         = currentFilters[3].currentValue;
    bu          = currentFilters[4].currentValue;
    department  = currentFilters[5].currentValue;
    dm          = currentFilters[6].currentValue;
    category    = currentFilters[7].currentValue;
  } else {
    node        = currentFilters[0].currentValue;
    metric      = currentFilters[1].currentValue;
  }

  if(updatedFilter){
    const changedFilter = encodeURIComponent(updatedFilter.currentFilter);
    switch (updatedFilter.filterName) {
      case "NODE":
        node = changedFilter;
        break;
      case "LT METRIC":
        metric = changedFilter;
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

  const request_url = `http://localhost:8585/api/dm-goals?node=${node}&metric=${metric}&sbu=${sbu}&cbu=${cbu}&bu=${bu}&department=${department}&dm=${dm}&category=${category}`;
  console.log(request_url);
  const filtersPromise = axios.get(request_url);

  return {
    type: 'FILTER_CHANGED',
    payload: filtersPromise
  };
}
