export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "932e29d1c1mshdfdad6c5330668fp1ecbb3jsna9e26a9978d2",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_API_URL =
  "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions";

// const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions";
// const options = {};

// try {
//   const response = await fetch(METEO_API_URL, options);
//   const result = await response.text();
//   console.log(result);
// } catch (error) {
//   console.error(error);
// }

// export const METEO_API_URL =
//   "https://api.open-meteo.com/v1/forecast?latitude=-15.7797&longitude=-47.9297&hourly=temperature_2m&forecast_days=16";

// fetch(METEO_API_URL)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Erro ao carregar os dados da API");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data); // Aqui você recebe os dados da API e pode fazer o que quiser com eles
//   })
//   .catch((error) => {
//     console.error("Erro durante a solicitação da API:", error);
//   });
