import React from "react";

export const uniqueValuesCategory = (products, field) => {
  const newUnique = products.map((item) => item?.[field]);
  return ["all categories", ...new Set(newUnique)];
};

export const uniqueValuesCompany = (products, field) => {
  const newUnique = products.map((item) => item?.[field]); // Remove optional chaining
  return ["all companies", ...new Set(newUnique)];
};

export const uniqueCategory = (products, field) => {
  const newUnique = products.map((item) => item?.[field]);
  return [...new Set(newUnique)];
};
