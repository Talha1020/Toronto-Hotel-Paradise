import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';
import { useContext } from 'react';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onDeleteCabin, disabled, ModalForm }) {
  return (
    <StyledConfirmDelete>
      <Heading as='h3'>Delete {resourceName}</Heading>
      <p>
        Are you sure to delete {resourceName} permanently? <br />
        This action cannot be undone.
      </p>

      <div>
        <Button
          variation='secondary'
          disabled={disabled}
          onClick={ModalForm}
        >
          Cancel
        </Button>
        <Button
          variation='danger'
          disabled={disabled}
          onClick={onDeleteCabin}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
