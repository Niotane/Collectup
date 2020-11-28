import { Form, FormField, TextInput, Select } from 'grommet';
import ImageUploadView from './ImageUploadView';
import useForm from './useForm';
import formHandler from './formHandler';

function FormView() {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      coordinates: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  return (
    <Form
      value={{}}
      onReset={() => {}}
      onSubmit={(evt) => formHandler(evt, formState)}
    >
      <FormField name='name' htmlfor='text-input-id' label='Name'>
        <TextInput id='text-input-id' name='name' />
      </FormField>
      <FormField name='phone' htmlfor='text-input-id' label='Phone No.'>
        <TextInput id='text-input-id2' name='phone' />
      </FormField>
      <FormField
        name='description'
        htmlfor='text-input-id'
        label='Item Description'
      >
        <TextInput id='text-input-id3' name='description' />
      </FormField>
      <FormField name='address' htmlfor='text-input-id' label='Address'>
        <TextInput id='text-input-id4' name='address' />
      </FormField>
      <FormField name='country' htmlfor='text-input-id' label='Country'>
        <TextInput id='text-input-id5' name='country' />
      </FormField>
      <FormField name='city' htmlfor='text-input-id' label='City'>
        <TextInput id='text-input-id6' name='city' />
      </FormField>
      <FormField name='category' htmlfor='text-input-id' label='Category'>
        <Select
          options={['household', 'electrical', 'metal']}
          name='category'
        />
      </FormField>
      <FormField name='image' htmlfor='text-input-id' label='Image'>
        <ImageUploadView
          id='image'
          name='image'
          onInput={inputHandler}
          errorText='Please provide an image.'
        />
      </FormField>
    </Form>
  );
}

export default FormView;
