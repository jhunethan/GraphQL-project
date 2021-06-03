import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import "../css/Home.css";



export default function Home() {
  const [queryContents] = useState(["name", "capital", "currency","languages { name }"])
  // name\ncapital\ncurrency\nlanguages{\nname\n}

  const defaultQuery = `{
    countries {
      ${queryContents.map((element)=>{return `${element}\n`})}
    }
  }`;
  const QUERY_LIST_OF_COUNTRIES = gql`
    ${defaultQuery}
  `;

  const [invokeQuery ,{ data, loading, error }] = useLazyQuery(QUERY_LIST_OF_COUNTRIES);

  return (
    <div className="homepage">
      <h1 className="homepage-header">Apollo Client/ GraphQL Demo</h1>
      <div className="homepage-body">
        <div className="user-interface">
          <div className="summary">
            <p>
              This application uses the Apollo client to make requests to an API
              that uses GraphQL
            </p>
            <p>
              Below is a preview of the query sent to retrieve the displayed
              data
            </p>
          </div>
          <button className="executeQuery" onClick={()=>invokeQuery()}>Execute Query</button>
          <div className="query-preview">
            <h2>GraphQL Query Preview</h2>
            <div className="query-preview-code first">{"{"}</div>
            <div className="query-preview-code second">countries {"{"}</div>
            {queryContents.map((query) => {
              return <div className="query-preview-code third">{query}</div>;
            })}
            <div className="query-preview-code second">{"}"}</div>
            <div className="query-preview-code first">{"}"}</div>
          </div>
        </div>
        <div className="listOfCountries">
          {loading && <h3>Data is loading</h3>}
          {error && <h3>{error.message}</h3>}
          {data &&
            data.countries.map(function (country, key) {
              console.log(country);
              return (
                <div className="country-card" key={key}>
                  <h2>{country.name}</h2>
                  <h4>Capital: {country.capital}</h4>
                  <h3>Currency: {country.currency}</h3>
                  <p>
                    {country.languages.map((language) => {
                      return <div>{language.name}</div>;
                    })}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
