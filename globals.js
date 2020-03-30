exports.allRegions = [
  {
    name: "Asia",
    sheetName: "Asia",
    slug: 'asia',
    scraper: "coronatracker"
  },
  {
    name: "Africa",
    sheetName: "Africa",
    slug: 'africa',
    scraper: "coronatracker"
  },
  {
    name: "World",
    sheetName: "Global",
    slug: 'global',
    startKey: "WORLD",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "USA",
    sheetName: "USA",
    slug: "usa",
    startKey: "UNITED STATES",
    totalKey: "U.S. TOTAL",
    scraper: "bno"
  },
  {
    name: "China",
    sheetName: "China",
    slug: "china",
    startKey: "MAINLAND CHINA",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Canada",
    sheetName: "Canada",
    slug: "canada",
    startKey: "CANADA",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Australia",
    sheetName: "Australia",
    slug: "australia",
    startKey: "AUSTRALIA",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Latin America",
    sheetName: "LatinAmerica",
    slug: "latinamerica",
    startKey: "Mundo Hispano",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Europe",
    sheetName: "Europe",
    slug: "europe",
    scraper: "coronatracker"
  },
  {
    name: "South America",
    slug: "south-america",
    scraper: "coronatracker"
  },
  {
    name: "North America",
    slug: "north-america",
    scraper: "coronatracker"
  },
  {
    name: "Oceania",
    slug: "oceania",
    scraper: "coronatracker"
  }
];

exports.displayOrder = [
  "Global",
  "USA",
  "Europe",
  "Asia",
  "Africa",
  "LatinAmerica",
  "China",
  "Canada",
  "Australia",
  "Oceania",
  "North America",
  "South America"
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
