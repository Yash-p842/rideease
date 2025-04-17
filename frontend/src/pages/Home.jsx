import React, { useState, useRef, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext.jsx";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking.jsx";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [inp, setinp] = useState("");
  const [fares, setfares] = useState({});
  const [finalFare, setfinalFare] = useState();
  const [finalVehicle, setfinalVehicle] = useState();
  const [finalRide, setfinalRide] = useState();
  const [confirmRideDetails, setconfirmRideDetails] = useState(null);

  const [panelOpen, setpanelOpen] = useState(false);
  const panelref = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (data) => {
    console.log(data);
    setconfirmRideDetails(data);
    setvehicleFound(false);
    setwaitingForDriver(true);
  });

  socket.on("ride-start", (data) => {
    setwaitingForDriver(false);
    console.log(data);
    navigate("/riding", { state: { ride: data } });
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setinp("pickup");
  }, [pickup]);

  useEffect(() => {
    setinp("destination");
  }, [destination]);

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelref.current, {
          height: "70%",
          padding: 24,
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelref.current, {
          height: "0%",
          padding: 0,
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  return (
    <div className="h-screen relative overflow-hidden ">
      <img
          className="w-28 mb-8"
          src="/public/rideease-logo.png"
        />

      <div
        onClick={() => {
          setvehiclePanel(false);
        }}
        className="h-screen w-screen"
      >
        <LiveTracking />
      </div>

      <div className="flex flex-col justify-end h-screen top-0 absolute w-full">
        <div className="h-[35%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setpanelOpen(false);
            }}
            className="absolute right-6 top-6 text-2xl opacity-30"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[32%] left-10 bg-gray-700 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-4 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pickup location"
              onClick={() => {
                setpanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setpickup(e.target.value);
              }}
            />

            <input
              className="bg-[#eee] px-12 py-4 mt-4 text-base rounded-lg mt-3 w-full"
              type="text"
              placeholder="Enter your destination"
              onClick={() => {
                setpanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setdestination(e.target.value);
              }}
            />
          </form>
          <button
            // onClick={findTrip}
            className="bg-black text-white px-4 py-4 mt-8 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelref} className=" bg-white h-0">
          <LocationSearchPanel
            setpanelOpen={setpanelOpen}
            setvehiclePanel={setvehiclePanel}
            pickup={pickup}
            setpickup={setpickup}
            destination={destination}
            setdestination={setdestination}
            inp={inp}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          setconfirmRidePanel={setconfirmRidePanel}
          setvehiclePanel={setvehiclePanel}
          vehiclePanel={vehiclePanel}
          pickup={pickup}
          destination={destination}
          fares={fares}
          setfares={setfares}
          setfinalFare={setfinalFare}
          setfinalVehicle={setfinalVehicle}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmedRide
          setconfirmRidePanel={setconfirmRidePanel}
          setvehicleFound={setvehicleFound}
          setvehiclePanel={setvehiclePanel}
          pickup={pickup}
          destination={destination}
          finalFare={finalFare}
          finalVehicle={finalVehicle}
          setfinalRide={setfinalRide}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <LookingForDriver
          setvehiclePanel={setvehiclePanel}
          setconfirmRidePanel={setconfirmRidePanel}
          setvehicleFound={setvehicleFound}
          pickup={pickup}
          destination={destination}
          finalFare={finalFare}
          finalVehicle={finalVehicle}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver
          setWaitingForDriver={setwaitingForDriver}
          confirmRideDetails={confirmRideDetails}
        />
      </div>
    </div>
  );
};

export default Home;
