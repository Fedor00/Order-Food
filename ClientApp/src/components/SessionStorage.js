import { useState, useEffect } from "react";

function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = sessionStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    const defaultObject = {
      OrderItems: [],
      restaurantId: 0,
      totalPrice: 0,
      restaurantName: "",
    };

    return { ...defaultObject, ...initialValue };
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
    console.log(value);
  }, [key, value]);

  const resetValue = () => {
    const defaultObject = {
      OrderItems: [],
      restaurantId: 0,
      totalPrice: 0,
      restaurantName: "",
    };

    setValue((prevValue) => ({
      ...defaultObject,
      ...initialValue,
    }));
  };

  return [value, setValue, resetValue];
}

export default useSessionStorage;
