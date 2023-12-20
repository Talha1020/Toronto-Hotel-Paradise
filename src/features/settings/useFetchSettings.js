import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

function useFetchSettings() {
  const { isLoading, error, data: settingsData } = useQuery({ queryKey: ['settings'], queryFn: getSettings });

  return { settingsData, isLoading };
}

export default useFetchSettings;
