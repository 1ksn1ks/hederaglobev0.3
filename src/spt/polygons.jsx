// ./spt/polygons.jsx

export const addPolygonLayer = (mapRef) => {
    // Add the polygon source and layer once the map has loaded
    mapRef.current.on('load', () => {
      // Add the geojson source with polygon coordinates
      mapRef.current.addSource('polygon-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {
            link: 'https://sentx.io/' // Link to open on click
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-133, 57],
                [-80, 57],
                [-80, 17],
                [-133, 17],
                [-133, 57]
              ]
            ]
          }
        }
      });
  
      // Load the image for the polygon overlay
      mapRef.current.loadImage(
        'https://tier.bot/api/inscription-cdn/0.0.4819897',
        (error, image) => {
          if (error) throw error;
          // Add the image to the map (this loads it only once)
          mapRef.current.addImage('pattern', image);
  
          // Add a layer using the polygon source
          mapRef.current.addLayer({
            id: 'pattern-layer',
            type: 'fill',
            source: 'polygon-source',
            paint: {
              'fill-color': 'rgba(255, 255, 255, 0)', // Transparent fill to show the image
              'fill-opacity': 0 // Ensure the fill is transparent if using image overlay
            }
          });
  
          // Add a layer to display the image overlay
          mapRef.current.addLayer({
            id: 'image-layer',
            type: 'raster', // Use raster type for image
            source: {
              type: 'image',
              url: 'https://tier.bot/api/inscription-cdn/0.0.4819897', // Image URL
              coordinates: [
                // Coordinates to define where to place the image
                [-133, 57],
                [-80, 57],
                [-80, 37],
                [-133, 37]
              ]
            }
          });
  
          // Add a click event listener for the polygon layer
          mapRef.current.on('click', 'pattern-layer', (e) => {
            const properties = e.features[0].properties;
            if (properties.link) {
              window.open(properties.link, '_blank'); // Open the link in a new tab
            }
          });
  
          // Change the cursor to a pointer when hovering over the polygon
          mapRef.current.on('mouseenter', 'pattern-layer', () => {
            mapRef.current.getCanvas().style.cursor = 'pointer';
          });
  
          // Change the cursor back to default when not hovering over the polygon
          mapRef.current.on('mouseleave', 'pattern-layer', () => {
            mapRef.current.getCanvas().style.cursor = '';
          });
        }
      );
    });
  };
  