import getCustomMarker from './customMarker';

function addMarkersToMap({ markers, ui, map, setCurrMarker }) {
  const H = window.H;
  const domIcon = getCustomMarker(H, ui, setCurrMarker);

  markers.forEach((marker) => {
    const position = marker.location;
    const loc = new H.map.DomMarker(position, { icon: domIcon });
    loc.setData(marker);
    map.addObject(loc);
  });
}

export default addMarkersToMap;
