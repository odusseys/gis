import styled from "styled-components";
import colors from "styles/colors";

export const Button = styled.button`
  border: none;
  border-radius: 8px;
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 12px;
`;

export const ColoredButton = styled(Button)`
  background-color: ${colors.coal};
  color: white;
`;
