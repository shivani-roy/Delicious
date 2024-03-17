import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import { recipe } from "../components/data";

const url = "https://api.spoonacular.com/recipes";

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `${url}/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`
      );

      const data = await response.json();

      if (data.status === "failure") {
        navigate("*");
      }

      setDetails(data);
      console.log(data, details);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (loading) {
    return <div className="loading"></div>;
  }
  const {
    image,
    title,
    instructions,
    summary,
    extendedIngredients: ingredients,
  } = details;

  return (
    <>
      <Wrapper>
        <div>
          <h2>{title}</h2>
          <img
            src={image}
            alt={title}
          />
        </div>

        <div className="info">
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instuctions
          </Button>

          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>

          {activeTab === "instructions" ? (
            <div>
              <h3 dangerouslySetInnerHTML={{ __html: summary }}></h3>
              <p dangerouslySetInnerHTML={{ __html: instructions }}></p>
            </div>
          ) : (
            <ul>
              {ingredients.map(({ id, name }) => {
                return <li key={id}>{name}</li>;
              })}
            </ul>
          )}
        </div>
      </Wrapper>

      <Slink to={`/recipe/${id}/similar`}>view similar recipes</Slink>
    </>
  );
};

const Wrapper = styled.div`
  margin: 6rem 0;
  /* display: flex; */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  place-content: center;
  gap: 2rem;

  p {
    margin-top: 2rem;
    font-size: 1.2rem;
  }

  h2 {
    text-transform: capitalize;
  }
  img {
    width: 100%;
    border-radius: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
    margin-bottom: 0.75rem;
  }

  li:first-child {
    margin-top: 2rem;
  }
  ul {
    margin-bottom: 2rem;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  .info {
    margin-left: 4rem;
    margin-top: 3rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: white;
  color: #313131;
  margin-right: 1rem;
  cursor: pointer;
  border: 2px solid black;
  font-weight: 600;
  font-size: 1rem;
  display: inline-block;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const Slink = styled(Link)`
  padding: 1rem 2rem;
  background: #313131;
  color: #fff;
  width: 20rem;
  margin: 2rem auto;
  cursor: pointer;
  border: 2px solid black;
  font-weight: 600;
  font-size: 1rem;
  display: block;
  text-transform: capitalize;
  text-decoration: none;
  text-align: center;

  a:hover {
    background: white;
    color: #313131;
  }
`;
export default Recipe;
