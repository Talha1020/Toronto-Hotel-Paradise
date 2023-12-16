import { HiSquare2Stack, HiPencil, HiTrash } from 'react-icons/hi2';

import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import Row from '../../ui/Row';
import ButtonGroup from '../../ui/ButtonGroup';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import ButtonIcon from '../../ui/ButtonIcon';
import useDeleteCabin from './useDeleteCabin';

import useInsertCabin from './useInsertCabin';

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
  const { image, name, discount, regularPrice, maxCapacity, id, description } = cabin;
  const [showForm, setShowForm] = useState(false);
  const { deletePresentCabin } = useDeleteCabin();
  const { insertCabin, isInserting } = useInsertCabin();
  const [DupName, setName] = useState(1);
  return (
    <Row>
      <TableRow>
        <Img src={image}></Img>
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount> {discount ? formatCurrency(discount) : '---'}</Discount>
        <ButtonGroup>
          <ButtonIcon
            onClick={() => {
              setName((prev) => prev + 1);
              insertCabin({ image, name: `${name}-${DupName}`, discount, regularPrice, maxCapacity, description });
            }}
          >
            <HiSquare2Stack />
          </ButtonIcon>
          <ButtonIcon onClick={() => setShowForm((showForm) => !showForm)}>
            <HiPencil />
          </ButtonIcon>
          <ButtonIcon onClick={() => deletePresentCabin(id)}>
            <HiTrash />
          </ButtonIcon>
        </ButtonGroup>
      </TableRow>
      {showForm && <CreateCabinForm CabinToEdit={cabin} />}
    </Row>
  );
}

export default CabinRow;
