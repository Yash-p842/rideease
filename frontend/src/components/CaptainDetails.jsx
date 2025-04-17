import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext.jsx";

const CaptainDetails = (props) => {
 

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">{props.captain.fullname.firstname+" "+props.captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">&#8377;295.20</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2  font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div>
          <i className="text-3xl mb-2  font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">5.0</h5>
          <p className="text-sm text-gray-600">Hours Active</p>
        </div>
        <div>
          <i className="text-3xl mb-2  font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">2</h5>
          <p className="text-sm text-gray-600">Bookings Completed</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
