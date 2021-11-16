// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'name',
      type: 'categorical',
      stops: [
        ['Bangladesh', '#E74C3C'],
        ['Bhutan', '#EB984E'],
        ['India', '#5DADE2'],
        ['Pakistan', '#2ECC71'],
        ['Nepal', '#F9E79F'],
        ['Afghanistan', '#1F618D'],
        ['Sri Lanka', '#1A5276'],
      ]
    },
    'fill-opacity': 0.5
  }
};
