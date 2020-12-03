const BASE_URL = 'https://oxford-hackathon.el.r.appspot.com';

const getCoordinates = async (query) => {
  const { access_token } = JSON.parse(localStorage.getItem('collectupAuth'));

  const res = await fetch(`${BASE_URL}/forward`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      method: 'GET',
      url: `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
        query
      )}`,
      authorization: `Bearer ${access_token}`,
    }),
  });

  if (res.status === 200) {
    const body = await res.json();
    if (body.items) return body.items[0].position;
  }

  return { lat: undefined, lng: undefined };
};

export default getCoordinates;
