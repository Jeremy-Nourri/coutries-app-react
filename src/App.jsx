import axios from "axios";
import { useEffect, useState, useRef } from "react";
import CountryList from "./components/CountryList";
import "./App.css";

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isSubmitSearch, setIsSubmitSearch] = useState(false);

  const inputSearch = useRef();

  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=id,translations,flags,region,population,capital"
      )
      .then((response) => {
        setCountriesList(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const searchWordCleaned = inputSearch.current.value.toLowerCase().trim();
    const countrySearched = countriesList.filter(
      (country) =>
        country.translations.fra.common.toLowerCase() === searchWordCleaned
    );
    setFilteredCountries(countrySearched);
    setIsSubmitSearch(true);
  };

  const resetTheSearch = () => {
    setFilteredCountries([]);
    setIsSubmitSearch(false);
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmitSearch} className="w-1/6 mx-auto my-2">
          <label className="input input-bordered flex items-center">
            <input type="text" className="grow" placeholder="Rechercher un pays" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>
        </form>

      </header>
      <main>
        {!isSubmitSearch ? (
          <CountryList countries={countriesList} />
        ) : filteredCountries.length > 0 ? (
          <>
            <CountryList countries={filteredCountries} />
            <button className="btn btn-accent" onClick={resetTheSearch}>
              Revenir à la liste compléte
            </button>
          </>
        ) : (
          <>
            <p>Aucun pays ne correspond à votre recherche</p>
            <button className="btn btn-accent" onClick={resetTheSearch}>
              Revenir à la liste compléte
            </button>
          </>
        )}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
