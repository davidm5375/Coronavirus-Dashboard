const globals = require("./globals");
const utilities = require("./utilities");
const bnoScraper = require("./micro-scrapers/bno");
const cnnScraper = require("./micro-scrapers/cnn");
const novelcovid = require("./micro-scrapers/novelcovid");
const coronatrackerScraper = require("./micro-scrapers/coronatracker");
const fs = require("fs");

const allContinentLists = utilities.getAllContinentLists();

exports.fetchAllData = async () => {
  const allData = {};
  const bnoRegions = globals.allRegions
    .filter(region => {
      return region.scraper === "bno";
    })
    .map(region => bnoScraper.fetchData(region));

  console.log("[SYNC] Fetching all BNO data.");

  Promise.all(bnoRegions)
    .then(data => {
      // Gather BNO data as base.
      data.map(resolvedRegion => {
        if (resolvedRegion === {})
          return Promise.reject("Couldn't fetch data for a region.");
        allData[resolvedRegion.regionName] = resolvedRegion;
      });

      if (Object.keys(allData).indexOf("undefined") >= 0) {
        return Promise.reject("Couldn't fetch data.");
      }

      Object.keys(allContinentLists).map(region => {
        if (["Global", "USA"].includes(region)) return;
        const generatedRegion = utilities.generateRegionFromList(
          region,
          allData["Global"].regions,
          allContinentLists[region]
        );
        if (generatedRegion.regions.length) allData[region] = generatedRegion;
      });
    })
    .then(() => {
      console.log("[SYNC] Fetching all coronatracker data.");
      coronatrackerScraper.fetchData().then(coronatrackerData => {
        Object.keys(allData).map(region => {
          if (["Global", "USA"].includes(region)) return;
          let coronatrackerRegions = utilities.pullCountriesFromRegion(coronatrackerData, allData[region].regions);
          allData[region].regions,
            (coronatrackerData = utilities.syncTwoRegions(
              coronatrackerData,
              allData[region].regions
            ));
        });
        console.log("[SYNC] Fetching all novelcovid data.");
        syncWithAllCountryList(allData).then(allSyncedData => {


          // Save USA data to in the Global Region
          allSyncedData["Global"].regions.map((region, index) => {
            if (region.country === "United States") {
              allSyncedData[
                "USA"
              ].regionTotal.recoveryRate = utilities.calculatePercentage(
                allSyncedData["USA"].regionTotal.recovered,
                allSyncedData["USA"].regionTotal.cases,
                true,
                false
              );
              allSyncedData[
                "USA"
              ].regionTotal.todayDeathRate = utilities.calculatePercentage(
                allSyncedData["USA"].regionTotal.todayDeaths,
                allSyncedData["USA"].regionTotal.deaths,
                false,
                true
              );
              allSyncedData[
                "USA"
              ].regionTotal.todayCaseRate = utilities.calculatePercentage(
                allSyncedData["USA"].regionTotal.todayCases,
                allSyncedData["USA"].regionTotal.cases,
                false,
                true
              );

              allSyncedData["Global"].regions[index] =
                allSyncedData["USA"].regionTotal;
              allSyncedData["Global"].regions[index].country = "United States";
              allSyncedData["Global"].regions[index].countryCode = "US";
            }
          });

          Object.keys(allSyncedData).map(region => {
            allSyncedData[region].slug = utilities.slugify(region)
            console.log(`[SYNC] Successful: ${region} - Saved.`);
            utilities.writeJSONFile(allSyncedData[region].slug, allSyncedData[region]);
          });
        });
      });
    });
};

const calculatePercentages = regions => {
  regions.map(region => {
    region.todayDeathRate = utilities.calculatePercentage(
      region.todayDeaths,
      region.deaths,
      false,
      true
    );
    region.todayCaseRate = utilities.calculatePercentage(
      region.todayCases,
      region.cases,
      false,
      true
    );
  });
  return regions;
};

//TODO: Sync USA total with North America and Global
//TODO: Check if other regions/continents have this issue.
const syncWithAllCountryList = allData => {
  return novelcovid.fetchData().then(novelData => {
    Object.keys(allData).map(region => {
      allData[region].regions,
        (novelData = utilities.syncTwoRegions(
          allData[region].regions,
          novelData,
          region,
          [{ region: "Global", skip: "Georgia" }]
        ));

      allData[region].regions = calculatePercentages(allData[region].regions);

      const tempUSATotal = allData["USA"].regionTotal.cases;
      const tempGlobalTotal = allData["Global"].regionTotal.cases;

      allData[region].regionTotal = utilities.calculateRegionTotal(
        allData[region].regions
      );

      allData["USA"].regionTotal.cases = tempUSATotal;
      allData["Global"].regionTotal.cases = tempGlobalTotal;
    });
    return allData;
  });
};
