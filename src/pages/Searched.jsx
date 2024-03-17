import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
// import data from "../components/data";

const url = "https://api.spoonacular.com/recipes/complexSearch";

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [number, setNumber] = useState(25);
  const [loading, setLoading] = useState(true);

  const { search } = useParams();
  // console.log(search);

  const getSearchedRecipes = async (query) => {
    try {
      const response = await fetch(
        `${url}?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=${number}&query=${query}`
      );

      const data = await response.json();
      console.log(data);
      setSearchedRecipes(data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchedRecipes(search);
  }, [search, number]);

  return (
    <>
      <Wrapper
        key={location.pathname}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{`${search} recipes`}</h2>
        <div>
          {searchedRecipes.map(({ id, title, image }) => {
            return (
              <Card key={id}>
                <Link to={`/recipe/${id}`}>
                  <p>{title}</p>
                  <img
                    src={image}
                    alt={title}
                  />
                </Link>
              </Card>
            );
          })}
        </div>

        {!loading && number <= 100 && (
          <button
            className="btn"
            onClick={() => {
              setNumber((oldNum) => {
                return oldNum + 25;
              });
            }}
          >
            view more recipes
          </button>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled(motion.div)`
  div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  h2 {
    text-transform: capitalize;
  }

  .btn {
    padding: 1rem 2rem;
    background: #313131;
    color: white;
    display: block;
    width: 20rem;
    margin: 0 auto;
    cursor: pointer;
    border: 2px solid black;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 1rem;
    text-transform: capitalize;
    text-align: center;
  }

  .btn:hover {
    background: white;
    color: #313030;
  }
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
    object-fit: cover;
    cursor: pointer;
    box-shadow: var(--dark-shadow);
  }

  a {
    text-decoration: none;
    display: grid;
    gap: 0.5rem;
    align-items: center;
  }

  p {
    text-align: center;
    /* padding: 1rem; */
    text-transform: capitalize;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;
export default Searched;
