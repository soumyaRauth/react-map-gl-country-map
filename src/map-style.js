// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'name',
      type: 'categorical',
      stops: [
        ['Bangladesh', '#f1f5f9'],
        ['Bhutan', '#f1f5f9'],
        ['India', '#f1f5f9'],
        ['Pakistan', '#f1f5f9'],
        ['Nepal', '#f1f5f9'],
        ['Afghanistan', '#f1f5f9'],
        ['Sri Lanka', '#f1f5f9'],
        ['Saudi Arabia', '#f1f5f9'],
        ['Yemen', '#f1f5f9'],
        ['Oman', '#f1f5f9'],
        ['UAE', '#f1f5f9'],
        ['Qatar', '#f1f5f9'],
        ['Kuwait', '#f1f5f9'],
      ]
    },
    'fill-opacity': 1
  }
};
