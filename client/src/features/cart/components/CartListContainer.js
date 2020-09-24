import styled from "styled-components";

const CartListContainer = styled.ul`
  padding: 0;
  list-style-type: none;
  padding: 1rem;
  li {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 0.1rem var(--cultured) solid;
  }
  li img {
    max-width: 10rem;
    max-height: 10rem;
  }
  li:first-child {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export default CartListContainer;
