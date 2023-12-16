import FormRow from '../../pages/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { min } from 'date-fns';
import useUpdateCabin from './useUpdateCabin';
import useInsertCabin from './useInsertCabin';


//// adding ={} ensures that when there is no data then the properties of {} will not stop the function rather than reading undefined CabinToEdit if its not there.
function CreateCabinForm({ CabinToEdit = {} }) {
  const { id: editId, ...editCabinDataRecieved } = CabinToEdit;
  const isEditCabin = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: editCabinDataRecieved,
  });

  const { updateCabin, isUpdating } = useUpdateCabin();
  const { insertCabin, isInserting } = useInsertCabin();
  const isWorking = isUpdating || isInserting;

  return (
    <Form
      onSubmit={handleSubmit((Cabinsdata) => {
        const image = typeof Cabinsdata.image === 'string' ? Cabinsdata.image : Cabinsdata.image[0];
        if (isEditCabin)
          updateCabin(
            { data: { ...Cabinsdata, image }, id: editId },
            {
              onSuccess: reset(),
            }
          );
        else
          insertCabin(
            { ...Cabinsdata, image },
            {
              onSuccess: reset(),
            }
          );
      })}
    >
      <FormRow htmlFor='name' label='Cabin name' FormErrors={errors?.name?.message}>
        <Input {...register('name', { required: 'This field cannot be empty !' })} type='text' id='name' disabled={isWorking} />
      </FormRow>
      <FormRow htmlFor='maxCapacity' label='Maximum capacity' FormErrors={errors?.maxCapacity?.message}>
        <Input
          {...register('maxCapacity', {
            required: 'This field cannot be empty !',
            min: { value: 1, message: 'maximum capacity cannot be 0 !' },
          })}
          type='number'
          id='maxCapacity'
          min={0}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow htmlFor='regularPrice' label='Regular price' FormErrors={errors?.regularPrice?.message}>
        <Input
          {...register('regularPrice', {
            required: 'This field cannot be empty !',
            min: { value: 0, message: 'Please enter a value more than 0 !' },
          })}
          type='number'
          id='regularPrice'
          disabled={isWorking}
        />
      </FormRow>
      <FormRow htmlFor='discount' label='Discount' FormErrors={errors?.discount?.message}>
        <Input
          id='discount'
          {...register('discount', {
            required: true,
            max: {
              value: getValues('regularPrice'),
              message: 'Discount cannot be bigger than regular price !',
            },
          })}
          type='number'
          defaultValue={0}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow htmlFor='description' label='Description for website' FormErrors={errors?.description?.message}>
        <Textarea
          disabled={isWorking}
          id='description'
          {...register(
            'description',
            { required: 'This Field cannot be empty !' },
            {
              maxlength: {
                value: 100,
                message: "Character's limit exceeded 100 !",
              },
            }
          )}
          type='number'
          defaultValue=''
        />
      </FormRow>
      <FormRow htmlFor='image' label='Cabin photo' FormErrors={errors?.image?.message}>
        <FileInput
          {...register('image', {
            required: isEditCabin ? false : 'This field is required',
          })}
          id='image'
          accept='image/*'
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => reset()} variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button variation='primary' size='medium' disabled={isWorking}>
          {isEditCabin ? ' Edit cabin' : 'Insert new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
