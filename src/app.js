import * as React from "react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { render } from "react-dom";
import MapGL, { Source, Layer } from "react-map-gl";
import Pins from "../data_source/pins.js";
import ControlPanel from "./control-panel";
import { dataLayer } from "./map-style.js";
import { updatePercentiles } from "./utils";
import CITIES from "../data_source/cities.json";

// pk.eyJ1Ijoic2hvdW1tb3JhdXRoIiwiYSI6ImNrdTE0OTA5YTB6ZGQybnBjN3U4dTA3eHkifQ.YBf9n4C77kkV_vePiPHamQ
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2hvdW1tb3JhdXRoIiwiYSI6ImNrdTE0OTA5YTB6ZGQybnBjN3U4dTA3eHkifQ.YBf9n4C77kkV_vePiPHamQ"; // Set your mapbox token here

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
    maxBounds: [
      [-77.875588, 38.50705], // Southwest coordinates
      [-76.15381, 39.548764], // Northeast coordinates
    ],
    bearing: 0,
    pitch: 0,
  });
  const [year, setYear] = useState(null);
  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [pinInfo, setPinInfo] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch(
      // './bd_banani_polygon.json'
      "./data_source/asia.json"
      // './data.json',
    )
      .then((resp) => resp.json())
      .then((json) => setAllData(json));
  }, []);

  const isMounted = function useIsMounted() {
    const isMounted = useRef(false);

    useEffect(() => {
      isMounted.current = true;
      return () => (isMounted.current = false);
    }, []);

    return isMounted;
  };

  //Get the city info on click
  useEffect(() => {
    console.log("This is pin info");
    if (pinInfo) {
      alert(`REGION: ${pinInfo.region}`);
    } else {
      console.log("No data");
    }
    // console.log(isMounted.current? pinInfo:"");
    console.log("This is pin data");
  }, [pinInfo]);

  const onHover = useCallback((event) => {
    //Checks whether the hover is on the marker or not. If the hover is on the marker then hide the tooltip
    if (event.target.classList[0] == "overlays") {
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
    }
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
        mapStyle="mapbox://styles/shoummorauth/ckw8z8avm3fcs14paluhc6a4v"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={["data"]}
        onHover={onHover}
        onClick={onClick}
        renderWorldCopies= "true"
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
          {/* This is the pin marker on different cities */}
          {/* <div>{}</div> */}
          <Pins data={CITIES} onClick={setPinInfo} />
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
