import styled from "styled-components";
import colors from "styles/colors";

export const Button = styled.button`
  border: none;
  border-radius: 8px;
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: pointer;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.29);
`;

export const ColoredButton = styled(Button)`
  background-color: ${colors.coal};
  color: white;
`;
