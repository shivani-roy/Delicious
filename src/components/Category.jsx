import { FaPizzaSlice } from "react-icons/fa";
import { GiNoodles, GiHamburger, GiCakeSlice } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <Wrapper>
      <SLink to={"/cuisine/italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>

      <SLink to={"/cuisine/american"}>
        <GiHamburger />
        <h4>American</h4>
      </SLink>

      <SLink to={"/cuisine/french"}>
        <GiCakeSlice />
        <h4>French</h4>
      </SLink>

      <SLink to={"/cuisine/chinese"}>
        <GiNoodles />
        <h4>Chinese</h4>
      </SLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  /* gap: 4rem; */
  justify-content: center;
  margin: 4rem 0rem;
`;

const SLink = styled(NavLink)`
  width: 6rem;
  height: 6rem;
  padding: 1.5rem;
  border-radius: 50%;
  background: linear-gradient(35deg, #494949, #313131);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
  margin: 0rem 1rem;
  font-size: 1.45rem;
  color: #f3efef;
  text-decoration: none;
  transform: scale(0.9);
  cursor: pointer;

  h4 {
    font-size: 0.9rem;
    color: #f3efef;
  }

  &.active {
    background: linear-gradient(to right, #ebb12a, #e44c60);
  }
`;
export default Category;
