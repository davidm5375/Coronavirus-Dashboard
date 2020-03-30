const globals = require("./globals");
const fs = require("fs");
const utilities = require("./utilities");

exports.gatherAllRegions = (requestedRegions) => {
  return Promise.all(
    requestedRegions.map(region =>
      fs.promises.readFile(utilities.getJSONPath(region.slug))
    )
  ).then(values => {
    let data = {};
    let allSlugs = [];

    values.forEach(region => {
      const regionData = JSON.parse(region);
      const regionName = regionData.regionName;
      data[regionName] = regionData;
      allSlugs.push(regionData.slug)

      data[regionName].recoveryRate = utilities.calculatePercentage(
        data[regionName].regionTotal.recovered,
        data[regionName].regionTotal.cases,
        true,
        false
      ),
      data[regionName].regionTotal.todayDeathRate = utilities.calculatePercentage(
        data[regionName].regionTotal.todayDeaths,
        data[regionName].regionTotal.deaths,
        false,
        true
      ),
      data[regionName].regionTotal.todayCaseRate = utilities.calculatePercentage(
        data[regionName].regionTotal.todayCases,
        data[regionName].regionTotal.cases,
        false,
        true
      )
    });

    return {
      ...data,
      allSlugs: requestedRegions.map(region => {
        return region.slug
      }),
      allRegions: Object.keys(data)
    };
  });
};
