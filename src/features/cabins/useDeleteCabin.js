import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabins } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deletePresentCabin, error: deletingError } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabinData'] });
      toast.success('Cabin successfully deleted');
    },
    onError: () => {
      toast.error(deletingError.message);
    },
  });

  return { deletePresentCabin };
}

export default useDeleteCabin;
