import styled from "styled-components";
import colors from "styles/colors";

const Filter = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${p => (p.active ? colors.yellow : "white")};
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-offset: 1px 1px;
  elevation: 2;
  margin-right: 15px;
`;

export default Filter;
