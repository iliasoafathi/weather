import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
import ClickableMap from "./ClickableMap";

const Inputs = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
    //pour afficher erreur fach tatkun city khawya
    else toast.error('Please enter a city name');
  };

  const handleLocationClick = () => {

    //kayna f navigateur katjiblk localisation dyalk 

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnitsChange = (e) => {
    if (units !== e.currentTarget.name) setUnits(e.currentTarget.name);
  };

  return (
    <div className=" flex flex-row justify-center items-center my-6">
      <div className=" flex w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-xl"
          placeholder="Search Your Location..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {/*hado des icones kaynin f react*/}
        <BiSearchAlt2
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <HiLocationMarker
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
        
          <ClickableMap setQuery={setQuery} />
        <div className=" flex flex-row w-1/4 items-center justify-center">
          <button
            name="metric"
            className="text-xl text-white font-light hover:scale-125 transition ease-out"
            onClick={handleUnitsChange}
          >
            °C
          </button>
          <p className="text-xl text-white mx-1">|</p>
          <button
            name="imperial"
            className="text-xl text-white font-light hover:scale-125 transition ease-out"
            onClick={handleUnitsChange}
          >
            °F
          </button>
        </div>
      </div>
        <ToastContainer />
    </div>
  );
};

export default Inputs;
