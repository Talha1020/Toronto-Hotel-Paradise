import styled from 'styled-components';

import { useQuery } from '@tanstack/react-query';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { getCabins } from '../../services/apiCabins';
import useFetchCabin from './useFetchCabin';

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 2fr;
  column-gap: 2.4rem;
  align-items: center;
  justify-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.8rem;
`;
function CabinTable() {
  const { isLoading, error, Cabin } = useFetchCabin();

  if (isLoading) return <Spinner />;

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <Table role='table'>
      <TableHeader role='row'>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {Cabin.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
