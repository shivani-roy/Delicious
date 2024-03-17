import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
// import data from "./data";

const url = "https://api.spoonacular.com/recipes/random";

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);

  const getVegetarianRecipes = async () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      try {
        const response = await fetch(
          `${url}?apiKey=${
            import.meta.env.VITE_API_KEY
          }&number=25&tags=vegetarian`
        );
        const data = await response.json();

        localStorage.setItem("veggie", JSON.stringify(data.recipes));
        setVeggie(data.recipes);
        console.log(response, data, veggie);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getVegetarianRecipes();
  }, []);

  return (
    <Wrapper>
      <h2>Our Vegetarian Picks</h2>
      <Splide
        options={{
          // type: "loop",
          perPage: 3,
          // rewind: true,
          // width: "100vw",
          gap: "4rem",
          arrows: false,
          pagination: false,
          drag: "free",
        }}
      >
        {veggie.map(({ id, image, title }) => {
          return (
            <SplideSlide key={id}>
              <Card>
                <Link to={`/recipe/${id}`}>
                  <p>{title}</p>
                  <img
                    src={image}
                    alt={title}
                  />
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 1rem;

  h2 {
    font-family: "Montserrat", sans-serif;
  }
`;

const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  box-shadow: var(--dark-shadow);
  cursor: pointer;
  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem;
    /* opacity: 0.5; */
  }

  p {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    z-index: 10;
    width: 100%;
    text-transform: capitalize;
    text-align: center;
    color: white;
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40%;
  }
`;

const Gradient = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
`;

export default Veggie;
