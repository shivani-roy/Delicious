import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import data from "../components/data";

const url = "https://api.spoonacular.com/recipes/complexSearch";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  const [number, setNumber] = useState(25);
  const [loading, setLoading] = useState(true);

  const { type } = useParams();

  const getCuisineRecipes = async (cuisineName) => {
    try {
      const response = await fetch(
        `${url}?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=${number}&cuisine=${cuisineName}`
      );
      const data = await response.json();

      console.log(data);
      setCuisine(data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getCuisineRecipes(type);
  }, [type, number]);

  return (
    <>
      <Wrapper
        key={location.pathname}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <h3>{`${type} recipes`}</h3>

        <div>
          {cuisine.map(({ id, title, image }) => {
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

  h3 {
    text-transform: capitalize;
    margin-top: 3rem;
  }

  .btn {
    padding: 1rem 2rem;
    background: #313131;
    color: #fff;
    display: block;
    width: 20rem;
    margin: 2rem auto;
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
    font-size: 1.2rem;
    text-transform: capitalize;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;
export default Cuisine;
