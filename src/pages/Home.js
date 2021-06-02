import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from 'react-router-dom'

const QUERY_LIST_OF_COUNTRIES = gql`
{
    countries{
      name
      capital
      currency
    }
  }
`;
export default function Home() {
  const { data, loading, error } = useQuery(QUERY_LIST_OF_COUNTRIES);

  return (
    <div>
      <h1>List of Countries</h1>
      <Link to="/search">Search for a country</Link>
      <div className="listOfCountries">
        {loading && <h3>Data is loading</h3>}
        {error && <h3>{error.message}</h3>}
        {data && data.countries.map(function(country,key){
            return <div key={key}>
                <h2>{country.name}</h2>
                <h4>{country.capital}</h4>
                <h3>{country.currency}</h3>
            </div>
        })}
      </div>
    </div>
  );
}
