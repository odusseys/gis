import styled from "styled-components";
import colors from "styles/colors";

export const ColoredButton = styled.button`
  border: none;
  background-color: ${colors.coal};
  color: white;
  border-radius: 8px;
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 12px;
`;
