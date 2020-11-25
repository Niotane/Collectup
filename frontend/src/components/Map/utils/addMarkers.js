import getCustomMarker from './customMarker';

/**
 * Adds markers to the map highlighting the locations specified
 *
 * @param  {H.Map}    map                 A HERE Map instance within the application
 * @param  {H}        H                   A HERE instance
 * @param  {List}     markers             A list of markers
 */
async function addMarkersToMap(map, H, ui, markers, setCurrMarker) {
  const domIcon = getCustomMarker(H, ui, setCurrMarker);

  markers.forEach(marker => {
    const position = marker.location;
    const loc = new H.map.DomMarker(position, { icon: domIcon });
    loc.setData(marker);
    map.addObject(loc);
  });
}

export default addMarkersToMap;
