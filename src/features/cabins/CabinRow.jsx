/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteCabins } from "../../services/apiCabins";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import ButtonText from "../../ui/ButtonText";
import ButtonGroup from "../../ui/ButtonGroup";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 2fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.8rem;
  justify-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;

  width: 6.2rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const ButtonContainer = styled.div`
  display: flex;
`;
function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabinData"] });
      toast.success("Cabin successfully deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <Row>
      <TableRow>
        <Img src={cabin.image}></Img>
        <Cabin>{cabin.name}</Cabin>
        <div>Fits up to {cabin.maxCapacity} guests</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        <Discount> {formatCurrency(cabin.discount)}</Discount>
        <ButtonGroup>
          <Button
            size="small"
            variation="secondary"
            onClick={() => mutate(cabin.id)}
          >
            Delete
          </Button>
          <Button
            size="small"
            variation="primary"
            onClick={() => setShowForm((showForm) => !showForm)}
          >
            Update
          </Button>
        </ButtonGroup>
      </TableRow>
      {showForm && <CreateCabinForm CabinToEdit={cabin} />}
    </Row>
  );
}

export default CabinRow;
