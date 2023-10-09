export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "932e29d1c1mshdfdad6c5330668fp1ecbb3jsna9e26a9978d2",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const url = "/adminDivisions";
const options = {};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}
