import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { EditCabins } from '../../services/apiCabins';

function useUpdateCabin() {
  const queryClient = useQueryClient();

  const {
    mutate: updateCabin,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: ({ data, id }) => EditCabins(data, id),
    ////// onSuccess has access to the data returned from the funciton
    onSuccess: () => {
      toast.success('Cabin has been successfully updated');
      queryClient.invalidateQueries(['cabinData']);
    },
    onError: () => toast.error(updateError.message),
  });
  return { updateCabin, isUpdating };
}

export default useUpdateCabin;
