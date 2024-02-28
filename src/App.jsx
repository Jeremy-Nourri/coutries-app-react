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
        <form onSubmit={handleSubmitSearch}>
          <label htmlFor="search">Rechercher un pays</label>
          <input type="search" ref={inputSearch} id="search" />
        </form>
      </header>
      <main>
        {!isSubmitSearch ? (
          <CountryList countries={countriesList} />
        ) : filteredCountries.length > 0 ? (
          <>
            <CountryList countries={filteredCountries} />
            <button onClick={resetTheSearch}>
              Revenir à la liste compléte
            </button>
          </>
        ) : (
          <>
            <p>Aucun pays ne correspond à votre recherche</p>
            <button onClick={resetTheSearch}>
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
