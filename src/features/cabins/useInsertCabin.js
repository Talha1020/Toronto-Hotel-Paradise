import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { EditCabins } from '../../services/apiCabins';

function useInsertCabin() {
  const queryClient = useQueryClient();
  const {
    mutate: insertCabin,
    isLoading: isInserting,
    error: insertError,
  } = useMutation({
    mutationFn: EditCabins,
    onSuccess: () => {
      toast.success('New cabin has been successfully added');
      queryClient.invalidateQueries(['cabinData']);
    },
    onError: () => toast.error(insertError.message),
  });

  return { insertCabin, isInserting };
}

export default useInsertCabin;
