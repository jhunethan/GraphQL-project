import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import "../css/Home.css";

export default function Home() {
  const [mainQuery, setMainQuery] = useState("countries");
  const [queryContents] = useState([
    "name",
    "capital",
    "currency",
    "languages { name }",
  ]);
  // name\ncapital\ncurrency\nlanguages{\nname\n}

  const defaultQuery = `{
    ${mainQuery} {
      ${queryContents.map((element) => {
        return `${element}\n`;
      })}
    }
  }`;
  const QUERY_LIST_OF_COUNTRIES = gql`
    ${defaultQuery}
  `;

  const [invokeQuery, { data, loading, error }] = useLazyQuery(
    QUERY_LIST_OF_COUNTRIES
  );

  setTimeout(() => {
    invokeQuery();
  }, 500);

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
          <button className="executeQuery" onClick={() => invokeQuery()}>
            Execute Query
          </button>
          <div className="mainQuery">
            <button
              onClick={() => {
                setMainQuery("countries");
              }}
            >
              Countries
            </button>
            <button
              onClick={() => {
                setMainQuery("languages");
              }}
            >
              Languages
            </button>
            <button
              onClick={() => {
                setMainQuery("continents");
              }}
            >
              Continents
            </button>
          </div>
          <div className="query-preview">
            <h2>GraphQL Query Preview</h2>
            <div className="query-preview-code nest-1">{"{"}</div>
            <div className="query-preview-code nest-2">countries {"{"}</div>
            {queryContents.map((query) => {
              return <div className="query-preview-code nest-3">{query}</div>;
            })}
            <div className="query-preview-code nest-2">{"}"}</div>
            <div className="query-preview-code nest-1">{"}"}</div>
          </div>
        </div>
        <div className="listOfCountries">
          {loading && <h3>Data is loading</h3>}
          {error && <h3>{error.message}</h3>}
          {data &&
            data.countries.map(function (object, key) {
              return (
                <div className="country-card" key={key}>
                  <h2>{object.name}</h2>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
