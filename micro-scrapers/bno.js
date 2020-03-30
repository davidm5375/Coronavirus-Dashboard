const axios = require("axios");
const csv = require("csvtojson");
const globals = require("../globals");
const time = require("../getTime");
const utilities = require("../utilities");
const fs = require("fs");

const keyOrders = {
  'usa': [
    "index ",
    "country ",
    "cases ",
    "new_cases ",
    "deaths ",
    "new_deaths ",
    "death_rate ",
    "serious ",
    "recovered "
  ],
  'global': [
    "index ",
    "country ",
    "cases ",
    "new_cases ",
    "deaths ",
    "new_deaths ",
    "death_rate ",
    "serious ",
    "recovered "
  ],
  'china': [
    "index ",
    "country ",
    "cases ",
    "deaths ",
    "serious ",
    "critical ",
    "recovered ",
    "mystery "
  ],
  'canada': [
    "index ",
    "country ",
    "cases ",
    "new_cases ",
    "deaths ",
    "new_deaths ",
    "death_rate ",
    "serious ",
    "recovered "
  ],
  'australia': [
    "index ",
    "country ",
    "cases ",
    "new_cases ",
    "deaths ",
    "new_deaths ",
    "death_rate ",
    "serious ",
    "recovered "
  ],
  'latinamerica': [
    "index ",
    "country ",
    "cases ",
    "deaths ",
    "serious ",
    "recovered ",
    "critical ",
    "mystery "
  ]
};

const keyMapping = {
  country: "country ",
  cases: "cases ",
  deaths: "deaths ",
  recovered: "recovered ",
  serious: "serious ",
  new_cases: "todayCases",
  new_deaths: "todayDeaths"
};

exports.fetchData = region => {
  console.log(`[SYNC] Fetching ${region.sheetName}`);
  return axios({
    method: "get",
    url: utilities.getExternalCSV(region.sheetName),
    responseType: "text"
  }).then(response => {
    return csv()
      .fromString(response.data)
      .then(json => {
        return generatedRegionalData(
          json,
          region.startKey,
          region.totalKey,
          region.slug
        );
      })
      .catch(error => {
        return error
      });
  });
};

const removeEmptyRows = data => {
  return data.filter(row => !!row["country "]);
};

const gatherCategoryIndexes = (order, data) => {
  return order.map(key =>
    data.findIndex(element => {
      return element["country "] === key;
    })
  );
};

const gatherBetweenRows = (startKey, endKey, data) => {
  return data.slice(startKey + 1, endKey);
};

const hasValidKeys = (region, slug) => {
  const receivedKeys = Object.keys(region);
  return keyOrders[slug].every((key, index) => {
    return receivedKeys[index] === keyOrders[slug][index];
  });
};

const generatedRegionalData = (data, startKey, totalKey, slug) => {
  const sanitiziedData = removeEmptyRows(data);
  const rowOrder = [startKey, totalKey];
  const rowIndexes = gatherCategoryIndexes(rowOrder, sanitiziedData);
  let sortedData = {
    regions: gatherBetweenRows(rowIndexes[0], rowIndexes[1], sanitiziedData),
    regionTotal: sanitiziedData.find(element => {
      return element["country "] === totalKey;
    })
  };
  if (!hasValidKeys(sortedData.regions[0], slug)) return false;
  sortedData.regionName = slug;
  sortedData.lastUpdated = time.setUpdatedTime();
  sortedData.regionTotal = utilities.remapKeys(
    sortedData.regionTotal,
    keyMapping
  );
  sortedData.regions = sortedData.regions.map(region => {
    return utilities.remapKeys(region, keyMapping);
  });
  sortedData.regions = utilities.renameCountryLabels(sortedData.regions);
  sortedData.regions.map(region => {
    region.serious = region.serious === "N/A" ? "0" : region.serious;
  });

  if (slug === "global") {
    sortedData = extractCountryFromRegion("Queue", sortedData);
  }

  return sortedData;
};

const extractCountryFromRegion = (country, data) => {
  const targetCountryIndex = data.regions
    .map(region => {
      return region.country;
    })
    .indexOf(country);

  const targetCountry = data.regions[targetCountryIndex];
  data.regions.splice(targetCountryIndex, 1);

  return data;
};
