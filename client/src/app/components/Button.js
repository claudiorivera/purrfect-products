import styled from "styled-components";

const Button = styled.button.attrs((props) => ({
  type: props.type || "button", // https://scalablecss.com/styled-components-attrs/
}))`
  font-size: ${({ small }) => (small ? ".75" : "1.2")}rem;
  padding: ${({ small }) => (small ? ".25" : "1")}rem;
  background-color: var(
    --${({ primary }) => (primary ? "orange-web" : "white")}
  );
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "")};
  border: 0.1rem var(--cultured) solid;
  cursor: pointer;
  &:hover {
    border: 0.1rem var(--oxford-blue) solid;
  }
`;

export { Button };
