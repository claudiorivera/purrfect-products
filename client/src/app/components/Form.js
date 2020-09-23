import styled from "styled-components";

const Form = styled.form`
  ul {
    display: flex;
    flex-direction: column;
    width: 32rem;
    padding: 2rem;
    border: 0.1rem var(--cultured) solid;
    border-radius: 0.5rem;
    list-style-type: none;
  }
  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  input {
    padding: 1rem;
    border: 0.1rem var(--cultured) solid;
    border-radius: 0.5rem;
  }
`;

export default Form;
