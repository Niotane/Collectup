const reverseLocationLookup = async (service, midLocationsProp) => {
  console.log(midLocationsProp);
  let locations = [];

  const locs = midLocationsProp.map((ele) => {
    const latlng = ele.location;
    const time = ele.time;
    const notices = ele.notices;

    service.reverseGeocode({ at: `${latlng.lat},${latlng.lng}` }, (result) => {
      locations.push(result.items[0].address.label);
    });

    return { location: {}, time, notices };
  });

  setTimeout(() => {
    const updatedLocs = locs.map((loc, index) => {
      return { ...loc, location: locations[index] };
    });
    console.log(updatedLocs);
    localStorage.setItem('midLocations', JSON.stringify(updatedLocs));
  }, 4000);

  // const midLocations = JSON.parse(localStorage.getItem('midLocations'));
  //   if (locs) {
  //     const millis = [];

  //     const locs = midLocations.map((ele) => {
  //       const latlng = ele.location;
  //       const time = ele.time;
  //       const notices = ele.notices;

  //       service.reverseGeocode(
  //         { at: `${latlng.lat},${latlng.lng}` },
  //         (result) => {
  //           const location = result.items[0].address.label;
  //           millis.push({ location, time, notices });
  //         }
  //       );

  //       return { time, notices };
  //     });

  //     setTimeout(() => {
  //       console.log(millis);
  //       localStorage.setItem('midLocations', JSON.stringify(millis));
  //     }, 4000);
  //   }

  // console.log(locs);
};

export default reverseLocationLookup;
