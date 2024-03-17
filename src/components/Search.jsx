import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch("");
    navigate("/searched/" + search);
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <div>
        <BiSearch />
        <input
          type="text"
          placeholder="muffin"
          value={search}
          onChange={handleChange}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  margin: 4rem;
  div {
    position: relative;
    max-width: 45rem;
    width: 100%;
    margin: auto;
  }

  input {
    width: 100%;
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(100%, -50%);
    color: white;
  }
`;
export default Search;
