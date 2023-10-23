const apiURL = `http://${process.env.API_URL}:5000/api`;

const charactersURL = apiURL + "/characters";
const filmsURL = apiURL + "/films";
const starshipsURL = apiURL + "/starships";
const planetsURL = apiURL + "/planets";

const config = {
  charactersURL,
  filmsURL,
  starshipsURL,
  planetsURL,
};

export default config;
