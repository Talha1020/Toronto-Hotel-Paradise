/* eslint-disable no-unused-vars */
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import { useQuery } from "@tanstack/react-query";
import CabinTable from "../features/cabins/CabinTable";

function Cabins() {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
