import React from "react";

const TopButton = ({ setQuery }) => {
  const cities = [
    {
      id: 1,
      title: "Kenitra",
    },
    {
      id: 2,
      title: "Rabat",
    },
    {
      id: 3,
      title: "CasaBlanca",
    },
    {
      id: 4,
      title: "Tanger",
    },
    {
      id: 5,
      title: "Agadir",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city, index) => (
        <button
          className="text-white text-lg font-medium"
          key={index}
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
};

export default TopButton;
