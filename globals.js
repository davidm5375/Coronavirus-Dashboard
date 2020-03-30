exports.allRegions = [
  {
    name: "Africa",
    sheetName: "Africa",
    scraper: "coronatracker"
  },
  {
    name: "World",
    sheetName: "Global",
    startKey: "WORLD",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "USA",
    sheetName: "USA",
    startKey: "UNITED STATES",
    totalKey: "U.S. TOTAL",
    scraper: "bno"
  },
  {
    name: "China",
    sheetName: "China",
    startKey: "MAINLAND CHINA",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Canada",
    sheetName: "Canada",
    startKey: "CANADA",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Australia",
    sheetName: "Australia",
    startKey: "AUSTRALIA",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Latin America",
    sheetName: "LatinAmerica",
    startKey: "Mundo Hispano",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Europe",
    sheetName: "Europe",
    scraper: "coronatracker"
  }
];

exports.displayOrder = [
  "Global",
  "USA",
  "Europe",
  "Africa",
  "LatinAmerica",
  "China",
  "Canada",
  "Australia"
];

exports.countryLists = {
  Europe: [
    "Albania",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Czechia",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "United Kingdom"
  ],
  Africa: [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo Republic",
    "Cote d'Ivoire",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "The Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe"
  ]
};

exports.AlternativeLabelNames = {
  "Bosnia and Herzegovina": "Bosnia",
  Brasil: "Brazil",
  "Czech Republic": "Czechia",
  México: "Mexico",
  Panamá: "Panama",
  "Rep. Dominicana": "Dominican Republic",
  Kyrgyzstan: "Kyrgyz Republic",
  UK: "United Kingdom",
  "S. Korea": "South Korea",
  "Iran, Islamic Republic of": "Iran",
  "UAE": " United Arab Emirates",
  "Macedonia, the former Yugoslav Republic of": "North Macedonia",
  "Viet Nam": "Vietnam",
  "Moldova, Republic of": "Moldova",
  "Venezuela, Bolivarian Republic of": "Venezuela",
  "Palestinian Territory, Occupied": "Palestine",
  "Coast D'Ivoire": "Ivory Coast",
  "Congo, the Democratic Republic of the": "DR Congo",
  "Cyrpus": "Northern Cyprus",
  "Macao": "Macau",
  "Tanzania": "Tanzania, United Republic of",
  "Syrian Arab Republic": "Syria",
  "Holy See (Vatican City State)": "Vatican City",
  "The Gambia": "Gambia",
  "Saint Kitts and Nevis": "St. Kitts and Nevis",
  "Libyan Arab Jamahiriya": "Libya",
  "USA": "United States"
};

exports.regionStructure = {
  regionName: "",
  regions: [],
  regionTotal: {
    country: "TOTAL",
    cases: "",
    deaths: "",
    recovered: "",
    serious: "",
    todayCases: "",
    todayDeaths: ""
  }
};

exports.countryStructure = {
  country: "TOTAL",
  cases: "",
  deaths: "",
  recovered: "",
  serious: "",
  todayCases: "",
  todayDeaths: ""
};

exports.CSV_URL =
  "https://docs.google.com/spreadsheets/d/1KZeg-BWiP0PPhVBw33BTA-KiCSSXIaG6cdnRqD27XYc/gviz/tq?tqx=out:csv&sheet=";
