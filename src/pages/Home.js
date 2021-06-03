import React, { useEffect, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import "../css/Home.css";

function DisplayList(props) {
  let dataset;

  if (props.data.countries) {
    dataset = props.data.countries;
    console.log(dataset);
    return dataset.map(function (object, key) {
      return (
        <div className="country-card" key={key}>
          <h2>{object.name}</h2>
          <h3>Capital: {object.capital}</h3>
          <h3>Currency: {object.currency}</h3>
          <p>
            {object.languages &&
              object.languages.map((language) => {
                return <div>{language.name}</div>;
              })}
          </p>
        </div>
      );
    });
  }
  if (props.data.languages) {
    dataset = props.data.languages;
    return dataset.map(function (object, key) {
      return (
        <div className="country-card" key={key}>
          <h2>{object.name}</h2>
        </div>
      );
    });
  }
  if (props.data.continents) {
    dataset = props.data.continents;
    return dataset.map(function (object, key) {
      return (
        <div className="country-card" key={`card${key}`}>
          <h2>{object.name}</h2>
        </div>
      );
    });
  }
}

export default function Home() {
  const [mainQuery, setMainQuery] = useState("countries");
  const [queryContents, setQueryContents] = useState(["name"]);

  useEffect(() => {
    switch (mainQuery) {
      case "countries":
        setQueryContents(["name", "capital", "currency", "languages { name }"]);
        break;
      default:
        setQueryContents(["name"]);
        break;
    }
    invokeQuery();
    // eslint-disable-next-line
  }, [mainQuery]);

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

          <div className="query-preview">
            <h2>GraphQL Query Preview</h2>
            <div className="mainQuery">
              <button
                onClick={() => {
                  setMainQuery("countries");
                }} className="executeQuery"
              >
                Countries
              </button>
              <button
                onClick={() => {
                  setMainQuery("languages");
                }} className="executeQuery"
              >
                Languages
              </button>
              <button
                onClick={() => {
                  setMainQuery("continents");
                }} className="executeQuery"
              >
                Continents
              </button>
            </div>
            <div className="query-preview-code nest-1">{"{"}</div>
            <div className="query-preview-code nest-2">
              {mainQuery} {"{"}
            </div>
            {queryContents.map((query, index) => {
              return (
                <div
                  key={`query${index}`}
                  className="query-preview-code nest-3"
                >
                  {query}
                </div>
              );
            })}
            <div className="query-preview-code nest-2">{"}"}</div>
            <div className="query-preview-code nest-1">{"}"}</div>
          </div>
        </div>
        <div className="listOfCountries">
          {loading && <h3>Data is loading</h3>}
          {error && <h3>{error.message}</h3>}
          {data && <DisplayList data={data} />}
        </div>
      </div>
    </div>
  );
}
