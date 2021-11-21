import {range} from 'd3-array';
import {scaleQuantile} from 'd3-scale';

export function updatePercentiles(featureCollection, accessor) {
  const {features} = featureCollection;
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
  return {
    type: 'FeatureCollection',
    features: features.map(f => {
      const value = accessor(f);
      
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value),
        style: function(feature) {
          return {
            fillColor: "red", // Default color of countries.
            fillOpacity: 1,
            stroke: true,
            color: "red", // Lines in between countries.
            weight: 2
          };
        }
      };

      console.log("Hello FFFFF");
      console.log(properties);

      return {...f, properties};
    })
  };
}
