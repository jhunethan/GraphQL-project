import { useLazyQuery, gql } from "@apollo/client";
import React, { useState } from "react";

export default function Search() {
  const [countrySearched, setCountrySearched] = useState("");

  const QUERY_COUNTRY = gql`
    query Country($code: ID!) {
      country(code: $code) {
        name
        capital
        emoji
        code
        currency
      }
    }
  `;

  const [searchCountry, { data, loading, error }] = useLazyQuery(QUERY_COUNTRY);

  return (
    <div className="search">
      <div className="inputs">
        <input
          id="countrySearchBox"
          type="text"
          placeholder="Type a country code e.g. BR"
          onChange={(event) => {
            setCountrySearched(event.target.value);
          }}
        />
        <button
          onClick={() =>
            searchCountry({
              variables: { code: countrySearched.toUpperCase() },
            })
          }
        >
          Search
        </button>
      </div>
      <div className="searchCountry">
        {data ? (
          <div className="countryDisplay">
            <h1> {data.country.name} </h1>
            <h2> {data.country.capital} </h2>
            <h3> {data.country.code} </h3>
          </div>
        ) : <div>Type a valid country code</div>}
        {}
      </div>
    </div>
  );
}
