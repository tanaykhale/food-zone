import { Outlet, useNavigate } from "react-router-dom";
import Icon from "../../images/Foody Zone.svg";
import "./navbar.css";
import { startTransition, useState } from "react";
interface Food {
  name: string;
  price: number;
  text: string;
  images: string;
  type: string;
}
interface Prop {
  handleClick: (value: string) => void;
  foods: Food[];
}
const Navbar = ({ handleClick, foods }: Prop) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const applyfilter = (filter: string) => {
    handleClick(filter);
    if (filter === "all") navigate("/");
    else
      startTransition(() => {
        navigate(`/?filter=${filter}`);
      });
  };
  const handleSearch = (val: string) => {
    if (
      foods.filter((food) => {
        return val.toLowerCase() === food.name.toLowerCase();
      })
    )
      navigate(`/?search=${val}`);
    else alert("Item not found");
  };
  return (
    <>
      <div className="container">
        <div className="logo">
          <img src={Icon} alt="" />
          <div>
            <input
              type="text"
              placeholder="Search Food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => handleSearch(search)} className="search">
              Search
            </button>
          </div>
        </div>
        <div className="icon-buttons">
          <button onClick={() => applyfilter("all")}>All</button>
          <button onClick={() => applyfilter("breakfast")}>Breakfast</button>
          <button onClick={() => applyfilter("lunch")}>Lunch</button>
          <button onClick={() => applyfilter("dinner")}>Dinner</button>
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default Navbar;
