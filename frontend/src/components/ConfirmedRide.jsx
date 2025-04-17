import React from "react";
import axios from 'axios'

const ConfirmedRide = (props) => {

  let url = ''

  const car_url = "https://pngimg.com/d/audi_PNG1736.png"
  const moto_url = "https://png.pngtree.com/png-clipart/20250104/original/pngtree-black-and-blue-sports-bike-motorcycle-on-a-transparent-background-png-image_19772017.png"
  const auto_url = "https://atulauto.co.in/wp-content/uploads/2024/09/Atul-Rik-cng.png"

  if(props.finalVehicle === 'car'){
    url = car_url
  }else if(props.finalVehicle === 'moto'){
    url = moto_url
  }else{
    url = auto_url
  }

  const createRide = async() => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, 
      {
        pickup: props.pickup,
        destination: props.destination,
        vehicleType: props.finalVehicle
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    props.setfinalRide(response.data.data)
  }

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
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>
      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-40"
          src={url}
        />

        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              {/* <h3 className="text-lg font-medium">{props.pickup}</h3> */}
              <p className="text-gray-600 text-sm -mt-1">
              {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
          <i className=" text-lg ri-map-pin-user-fill"></i>
            <div>
              {/* <h3 className="text-lg font-medium">562/11-A</h3> */}
              <p className="text-gray-600 text-sm -mt-1">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
          <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">&#8377;{Math.ceil(props.finalFare)}</h3>
              <p className="text-gray-600 text-sm -mt-1">
                Cash Cash
              </p>
            </div>
          </div>
        </div>

        <button onClick={()=>{
          const func = async() => {
            await createRide()
          }

          func()

          props.setvehicleFound(true)
          props.setconfirmRidePanel(false)
          props.setvehiclePanel(false)
        }} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg mb-12">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
