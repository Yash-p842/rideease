import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSearchPanel = (props) => {
  const [suggestions, setsuggestions] = useState([]);
  // const [destinationSuggestions, setdestinationSuggestions] = useState([]);

  async function suggestionLoader (input){
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${input}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setsuggestions(response.data.data)
  }

  useEffect(() => {
     
    const func = async () => {
      await suggestionLoader(props.pickup)
    }

    func()
    
  }, [props.pickup]);

  useEffect(() => {
     
    const func = async () => {
      await suggestionLoader(props.destination)
    }

    func()
    
  }, [props.destination]);

  // const locations = [
  //   "24B, Near Kapoor's cafe, Sheriyans School",
  //   "18B, Coding school, Gujarat, India",
  //   "Dr. Narendra Modi Stadium, Ahmedabad, Gujarat",
  //   "Rk beach, Visakhapatnam, India",
  // ]

  return (
    <div>
      {suggestions.map((lm, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              if(props.inp === 'pickup'){
                props.setpickup(lm.description)
              }else if(props.inp === 'destination'){
                props.setvehiclePanel(true);
                props.setpanelOpen(false);
                props.setdestination(lm.description)
              }
            }}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start bg-gray-100"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill "></i>
            </h2>
            <h4 className="font-medium">{lm.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
