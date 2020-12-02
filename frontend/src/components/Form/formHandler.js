const BASE_URL = 'https://oxford-hackathon.el.r.appspot.com';
// const BASE_URL = 'http://localhost:8080';

const formSubmitHandler = async (event, formState) => {
  event.preventDefault();
  console.log(event);
  try {
    let formData = new FormData();
    const [lat, lng] = event.target.coordinates.value.split(',');

    formData.append('user', event.target.name.value);
    formData.append('title', event.target.title.value);
    formData.append('description', event.target.description.value);
    formData.append('address', event.target.address.value);
    formData.append('city', event.target.city.value);
    formData.append('category', event.target.category.value);
    formData.append('location', JSON.stringify({ lat, lng }));
    formData.append('image', formState.inputs.image.value);

    console.log(formData);
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      body: formData,
    });
    console.log('response', response);
  } catch (err) {
    console.log(err);
  }
};

export default formSubmitHandler;
