import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const url = "https://api.spoonacular.com/recipes";

const SimilarRecipes = () => {
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const { id } = useParams();

  const getSimilarRecipes = async () => {
    try {
      const response = await fetch(
        `${url}/${id}/similar?apiKey=${import.meta.env.VITE_API_KEY}`
      );

      const data = await response.json();
      setSimilarRecipes(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSimilarRecipes();
  }, []);

  return (
    <>
      <Wrapper
        key={location.pathname}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div>
          {similarRecipes.map(({ id, title, imageType }) => {
            return (
              <Card key={id}>
                <Link to={`/recipe/${id}`}>
                  <p>{title}</p>
                  <img
                    src={` https://spoonacular.com/recipeImages/${id}-556x370.${imageType}`}
                    alt={title}
                  />
                </Link>
              </Card>
            );
          })}
        </div>
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
`;

const Card = styled.div`
  a {
    display: grid;
    gap: 0.5rem;
    align-items: center;
  }

  img {
    width: 100%;
    border-radius: 2rem;
    object-fit: cover;
    cursor: pointer;
    box-shadow: var(--dark-shadow);
  }

  a {
    text-decoration: none;
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
export default SimilarRecipes;
