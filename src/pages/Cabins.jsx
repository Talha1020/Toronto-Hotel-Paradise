import Heading from '../ui/Heading';
import Row from '../ui/Row';

import CabinTable from '../features/cabins/CabinTable';

import AddCabins from '../features/cabins/AddCabins';
import TableOperations from '../ui/TableOperations';
import { StyledSortButtons } from '../ui/Filter';
import { StyledSortSelect } from '../ui/Select';
import CabinTableOperations from '../ui/CabinTableOperations';

function Cabins() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabins />
      </Row>
    </>
  );
}

export default Cabins;
