import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { render } from "react-dom";
import MapGL, { Source, Layer } from "react-map-gl";
import Pins from "../data_source/pins.js";
import ControlPanel from "./control-panel";
import { dataLayer } from "./map-style.js";
import { updatePercentiles } from "./utils";
import CITIES from '../data_source/cities.json';

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2hvdW1tb3JhdXRoIiwiYSI6ImNrdTE0OTA5YTB6ZGQybnBjN3U4dTA3eHkifQ.YBf9n4C77kkV_vePiPHamQ"; // Set your mapbox token here

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  const [year, setYear] = useState(null);
  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch(
      // './bd_banani_polygon.json'
      "./data_source/south_asia.json"
      // './data.json',
    )
      .then((resp) => resp.json())
      .then((json) => setAllData(json));
  }, []);

  const onHover = useCallback((event) => {
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(
      hoveredFeature
        ? {
            feature: hoveredFeature,
            x: offsetX,
            y: offsetY,
          }
        : null
    );
  }, []);

  //onclick
  const onClick = useCallback((event) => {
    alert(
      `Region:  ${event.features[0].properties.region} \nCountry: ${event.features[0].properties.name}`
    );
  }, []);

  const data = useMemo(() => {
    return (
      allData && updatePercentiles(allData, (f) => f.properties.income[year])
    );
  }, [allData, year]);

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={["data"]}
        onHover={onHover}
        onClick={onClick}
      >
        
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
          <Pins data={CITIES}  />
        </Source>

        {hoverInfo && (
          <div
            className="tooltip"
            style={{ left: hoverInfo.x, top: hoverInfo.y }}
          >
            <div>Country: {hoverInfo.feature.properties.name}</div>
            <div>Product Volume: {hoverInfo.feature.properties.volume}</div>
          </div>
        )}
      </MapGL>

      <ControlPanel year={year} onChange={(value) => setYear(value)} />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
