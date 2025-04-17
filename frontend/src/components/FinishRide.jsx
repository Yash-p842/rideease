import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const FinishRide = (props) => {

  const navigate = useNavigate()

  async function endride() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, 
      {
        rideId: props.ride._id
      }, 
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    if(response.status === 200){
      props.setfinishRidePanel(false)
      navigate('/captain-home')
    }
  }

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 "
        onClick={() => {
          props.setfinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Finish this Ride
      </h3>

      <div className="flex items-center justify-between p-4 border-2 bg-yellow-400 rounded-lg mt-4 ">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg"
            alt=""
          />
          <h2 className="text-lg font-mediumm">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold"></h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              {/* <h3 className="text-lg font-medium">562/11-A</h3> */}
              <p className="text-gray-600 text-sm -mt-1">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div>
              {/* <h3 className="text-lg font-medium">562/11-A</h3> */}
              <p className="text-gray-600 text-sm -mt-1">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">&#8377;{Math.ceil(props.ride?.fare)}</h3>
              <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full">
          <button
            onClick={endride}
            className="w-full flex justify-center mt-5 bg-green-600 text-white text-lg font-semibold p-3 rounded-lg"
          >
            Finish Ride
          </button>



        </div>
      </div>
    </div>
  );
};

export default FinishRide;
