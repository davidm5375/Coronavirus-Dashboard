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
        const slug = utilities.slugify(region)
        if (["global", "usa"].includes(slug)) return;
        const generatedRegion = utilities.generateRegionFromList(
          slug,
          allData["global"].regions,
          allContinentLists[region]
        );
        if (generatedRegion.regions.length) allData[slug] = generatedRegion;
      });
    })
    .then(() => {
      console.log("[SYNC] Fetching all coronatracker data.");
      coronatrackerScraper.fetchData().then(coronatrackerData => {
        Object.keys(allData).map(region => {
          //if (["Global", "USA"].includes(region)) return;
          let coronatrackerRegions = utilities.pullCountriesFromRegion(coronatrackerData, allData[region].regions);
          allData[region].regions,
            (coronatrackerData = utilities.syncTwoRegions(
              coronatrackerData,
              allData[region].regions
            ));
        });
        console.log("[SYNC] Fetching all novelcovid data.");
        syncWithAllCountryList(allData).then(allSyncedData => {

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
    allData["global"].regions,
      (novelData = utilities.syncTwoRegions(
        allData["global"].regions,
        novelData,
        "global",
        [{ region: "global", skip: "Georgia" }]
      ));

    Object.keys(allData).map(region => {
      if(region === "global") return
      allData[region].regions,
        (novelData = utilities.syncTwoRegions(
          allData[region].regions,
          novelData,
          region,
          [{ region: "global", skip: "Georgia" }]
        ));

      allData[region].regions = calculatePercentages(allData[region].regions);

      allData[region].regionTotal = utilities.calculateRegionTotal(
        allData[region].regions
      );
    });

    // START SYNC all
    // TODO: This might be the worst code I've ever written. Will refactor.

    // Sync USA
    let usaIndexes = {
      global: 12,
      "north-america": 12
    }
    allData["global"].regions.forEach((region, index) => {
      if(region.country === "United States") usaIndexes.global = index;
    })

    allData["north-america"].regions.forEach((region, index) => {
      if(region.country === "United States") usaIndexes["north-america"] = index;
    })

    let usaData = allData["north-america"].regions[usaIndexes["north-america"]]

    allData["global"].regions[usaIndexes.global] = usaData
    allData["usa"].regionTotal = usaData

    // Sync Canada
    let canadaIndexes = {
      global: 12,
      "north-america": 12
    }

    allData["global"].regions.forEach((region, index) => {
      if(region.country === "Canada") canadaIndexes.global = index;
    })

    allData["north-america"].regions.forEach((region, index) => {
      if(region.country === "Canada") canadaIndexes["north-america"] = index;
    })

    let canadaData = allData["north-america"].regions[canadaIndexes["north-america"]]

    allData["global"].regions[canadaIndexes.global] = canadaData
    allData["canada"].regionTotal = canadaData

    // Sync Australia
    let australiaIndexes = {
      global: 12,
      "oceania": 12
    }
    allData["global"].regions.forEach((region, index) => {
      if(region.country === "Australia") australiaIndexes.global = index;
    })

    allData["oceania"].regions.forEach((region, index) => {
      if(region.country === "Australia") australiaIndexes["oceania"] = index;
    })

    let australiaData = allData["oceania"].regions[australiaIndexes["oceania"]]

    allData["global"].regions[australiaIndexes.global] = australiaData
    allData["australia"].regionTotal = australiaData

    // Sync China
    let chinaIndexes = {
      global: 12,
      "asia": 12
    }
    allData["global"].regions.forEach((region, index) => {
      if(region.country === "China") chinaIndexes.global = index;
    })

    allData["asia"].regions.forEach((region, index) => {
      if(region.country === "China") chinaIndexes["asia"] = index;
    })

    let chinaData = allData["asia"].regions[chinaIndexes["asia"]]

    allData["global"].regions[chinaIndexes.global] = chinaData
    allData["china"].regionTotal = chinaData

    // END SYNC


    const tempGlobalTotal = allData["global"].regionTotal.cases;
    allData["global"].regionTotal.cases = tempGlobalTotal;

    return allData;
  });
};
