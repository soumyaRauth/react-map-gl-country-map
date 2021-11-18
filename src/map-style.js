// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'name',
      type: 'categorical',
      stops: [
        ['Bangladesh', '#EB984E'],
        ['Bhutan', '#EB984E'],
        ['India', '#EB984E'],
        ['Pakistan', '#EB984E'],
        ['Nepal', '#EB984E'],
        ['Afghanistan', '#EB984E'],
        ['Sri Lanka', '#EB984E'],
      ]
    },
    'fill-opacity': 0.5
  }
};
