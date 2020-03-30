const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const path = require("path");
const stats = require("./fetchData");
const sync = require("./syncData");
const time = require("./getTime");
const globals = require("./globals");
const graphData = require("./tmp/statistics_graph.json");

const getContent = (req, res, view) => {
  let requestedRegions = globals.allRegions;
  if(req.params && req.params.region){
    requestedRegion = requestedRegions.filter(region => {
      return req.params.region.toLowerCase() === region.slug
    })

    if(requestedRegion.length === 1) {
      requestedRegions = requestedRegion
      view = "data-continent"
    }

  }

  sync.gatherAllRegions(requestedRegions).then(data => {
    res.render(view, {
      data: {
        ...data,
        lastUpdated: 'a few seconds ago',
        allRegions: requestedRegions
    }
    });
  }).catch(error => {
    console.error(error)
  })
};

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => getContent(req, res, "data"));
app.get("/about", (req, res) => res.render("about"));
app.get("/data/:region?", (req, res) => getContent(req, res, "data"));
app.get("/faq", (req, res) => res.render("faq"));
app.get("/map", (req, res) => res.render("map"));
app.get("/preparation", (req, res) => res.render("prepping"));
app.get("/prevention", (req, res) => res.render("prevention"));
app.get("/tweets", (req, res) => res.render("tweets"));
app.get("/wiki", (req, res) => res.render("coronainfo"));
app.get("/travel", (req, res) => res.render("travel"));
app.get("/press", (req, res) => res.render("press"));
app.get("/email", (req, res) => res.render("email"));

app.get("/graphs", (req, res) => res.render("graphs"));

app.listen(process.env.PORT || 3000);
console.log("Listening on port: " + 3000);
