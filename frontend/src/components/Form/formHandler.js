const BASE_URL = 'https://oxford-hackathon.el.r.appspot.com';

const formSubmitHandler = async (event, formState) => {
  event.preventDefault();
  try {
    let formData = new FormData();
    console.log(event.target.phone.value);
    formData.append('user', event.target.name.value);
    formData.append('phoneNumber', event.target.phone.value);
    formData.append('description', event.target.description.value);
    formData.append('address', event.target.address.value);
    formData.append('country', event.target.country.value);
    formData.append('city', event.target.city.value);
    formData.append('category', 'Household');
    formData.append('location', JSON.stringify({ lat: '36', lng: '105' }));
    formData.append('image', formState.inputs.image.value);
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      body: formData,
    });
    console.log('response', response);
  } catch (err) {}
};

export default formSubmitHandler;
