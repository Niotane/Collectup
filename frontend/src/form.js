import { Button, Box, Form, FormField, TextInput, Select } from 'grommet';
import ImageUpload from './util/ImageUpload';

function FormView({ formHandler, inputHandler }) {
  return (
    <Box flex justify='around' background='dark-2'>
      <Form value={{}} onReset={() => {}} onSubmit={(evt) => formHandler(evt)}>
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
          <ImageUpload
            id='image'
            name='image'
            onInput={inputHandler}
            errorText='Please provide an image.'
          />
        </FormField>
        <Box direction='row' gap='medium'>
          <Button type='submit' primary label='Submit' />
          <Button type='reset' label='Reset' />
        </Box>
      </Form>
    </Box>
  );
}

export default FormView;
