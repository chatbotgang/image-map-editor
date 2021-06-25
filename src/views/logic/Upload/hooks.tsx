import { useState, useEffect } from "react";

export const useUpload = () => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue("");
    return () => {};
  }, [value]);
  return value;
};
