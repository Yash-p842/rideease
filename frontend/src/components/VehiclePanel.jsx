import React, {useEffect, useState} from "react";
import axios from 'axios'

const VehiclePanel = (props) => {

  useEffect(()=> {
    const func = async() => {
      const rate = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-fare?pickup=${props.pickup}&destination=${props.destination}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      props.setfares(rate.data.data)
    }

    func()
  }, [props.vehiclePanel])

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 "
        onClick={() => {
          props.setvehiclePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={() => {
          props.setconfirmRidePanel(true);
          props.setfinalFare(Math.ceil(props.fares.car))
          props.setfinalVehicle('car')
        }}
        className="flex border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-20"
          src="https://pngimg.com/d/audi_PNG1736.png"
        />
        <div className="-ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Cab
            <span className="ml-2">
              <i className="ri-user-3-line"></i> 4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">&#8377;{Math.ceil(props.fares.car)}</h2>
      </div>
      <div
        onClick={() => {
          props.setconfirmRidePanel(true);
          props.setfinalFare(Math.ceil(props.fares.moto))
          props.setfinalVehicle('moto')
        }}
        className="flex border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-20"
          src="https://png.pngtree.com/png-clipart/20250104/original/pngtree-black-and-blue-sports-bike-motorcycle-on-a-transparent-background-png-image_19772017.png"
        />
        <div className="-ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Motorcycle
            <span className="ml-2">
              <i className="ri-user-3-line"></i> 1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable motorcycle ride
          </p>
        </div>
        <h2 className="text-lg font-semibold">&#8377;{Math.ceil(props.fares.moto)}</h2>
      </div>
      <div
        onClick={() => {
          props.setconfirmRidePanel(true);
          props.setfinalFare(Math.ceil(props.fares.auto))
          props.setfinalVehicle('auto')
        }}
        className="flex border-2 mb-2 active:border-black rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-20"
          src="https://atulauto.co.in/wp-content/uploads/2024/09/Atul-Rik-cng.png"
        />
        <div className="-ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Auto Rickshaw
            <span className="ml-2">
              <i className="ri-user-3-line"></i> 3
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable Auto ride
          </p>
        </div>
        <h2 className="text-lg font-semibold">&#8377;{Math.ceil(props.fares.auto)}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
