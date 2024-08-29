import { useEffect, useState } from "react";
import { product } from "../api/index";

const useProduct = (id) => {
  const [prod, setCategory] = useState(null);
  useEffect(() => {
    product
      .item(id)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { product: prod };
};
const useCategory = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    product
      .category()
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategory(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { category };
};
export { useCategory,useProduct };
