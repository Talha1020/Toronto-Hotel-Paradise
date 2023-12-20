import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useFetchCabin from './useFetchCabin';
import { Table } from '../../ui/Table';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { isLoading, error, Cabin = [] } = useFetchCabin();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('discount') || 'All';

  ////////////////////////////
  ////////////////////////////
  let filterdCabins;

  if (sort === 'All') {
    filterdCabins = Cabin;
  }
  if (sort === 'with-discount') {
    filterdCabins = Cabin.filter((cabin) => cabin.discount !== 0);
  }
  if (sort === 'without-discount') {
    filterdCabins = Cabin.filter((cabin) => cabin.discount === 0);
  }
  /////////////////////////////
  ////////////////////////////

  const SortByValue = searchParams.get('SortBy') || 'name-asc';
  const [SortStringValue, SortCode] = SortByValue.split('-');
  const Modifier = SortCode === 'asc' ? 1 : -1;
  const SortedCabins = filterdCabins.sort(
    (a, b) => (a[SortStringValue] - b[SortStringValue]) * Modifier
  );

  if (isLoading) return <Spinner />;

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <Table
      columns='0.6fr 1.8fr 2.2fr 1fr 1fr 2fr'
      role='row'
    >
      <Table.TableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.TableHeader>
      <Table.TableBody
        data={SortedCabins}
        render={(cabin) => (
          <CabinRow
            cabin={cabin}
            key={cabin.id}
          />
        )}
      ></Table.TableBody>
    </Table>
  );
}

export default CabinTable;
