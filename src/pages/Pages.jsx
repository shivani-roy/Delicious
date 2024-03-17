import Category from "../components/Category";
import { Outlet } from "react-router-dom";
import Search from "../components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import logo from "../assets/image.png";
import { motion } from "framer-motion";

const Pages = () => {
  return (
    <div>
      <Nav>
        <GiKnifeFork />
        <Logo to={"/"}>
          {(
            <img
              src={logo}
              alt="Delicious"
            />
          ) || "delicious"}
        </Logo>
      </Nav>
      <Search />
      <Category />

      <motion.div
        key={location.pathname}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 700;
  font-family: "Dancing Script", cursive;

  img {
    margin-top: 1rem;
    height: 2rem;
  }
`;

const Nav = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    font-size: 2.1rem;
  }
`;
export default Pages;
