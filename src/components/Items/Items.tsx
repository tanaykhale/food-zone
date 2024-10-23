import { useSearchParams } from "react-router-dom";
import "./items.css";

interface Food {
  name: string;
  price: number;
  text: string;
  images: string;
  type: string;
}

interface ItemsProps {
  userType: string;
  foods: Food[];
}

const Items = ({ userType, foods }: ItemsProps) => {
  // const [foods, setFoods] = useState<Food[]>([]);
  // const BASE_URL = "http://localhost:3000/foods";
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(BASE_URL);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const data = await response.json();
  //       setFoods(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const [searchParam] = useSearchParams();
  const filtertype = searchParam.get("filter");
  const search = searchParam.get("search");

  const filteredFoods = foods.filter((food) => {
    if (filtertype && food.type !== filtertype) {
      return false;
    }

    if (
      search &&
      !food.name.toLowerCase().includes(search.toLowerCase()) &&
      !food.text.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
  return (
    <div className="item-container">
      {filteredFoods.length > 0 ? (
        filteredFoods.map((food, i) => (
          <div className="details" key={i}>
            <div className="img-container">
              {food.images ? (
                <img
                  src={`http://localhost:5173/src${food.images}`}
                  alt={food.images}
                  style={{ width: "200px", height: "auto" }}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="text">
              <h3>{food.name}</h3>
              <p>Price: ${food.price}</p>
              <p>{food.text}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "white" }}>Item not found</p>
      )}
    </div>
  );
};

export default Items;
