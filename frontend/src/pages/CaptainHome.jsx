import React, {useState, useRef, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import {CaptainDataContext} from "../context/CaptainContext.jsx";
import { SocketContext } from "../context/SocketContext.jsx";
import LiveTracking from "../components/LiveTracking.jsx";

const CaptainHome = () => {
  
  const {captain} = useContext(CaptainDataContext)
  const {socket } = useContext(SocketContext)
  
  const [rideDetails, setrideDetails] = useState(null)
  
  const [ridePopupPanel, setridePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setconfirmRidePopupPanel] = useState(false)

  useEffect(()=>{
    socket.emit('join', {
      userId: captain._id,
      userType: "captain"
    })

    const updateLocation = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {

          socket.emit('update-captain-location', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    
    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    return () => clearInterval(locationInterval)
    

  }, [captain])

  socket.on('new-ride', (data) => {
    setrideDetails(data)
    setridePopupPanel(true)
  })
  


  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  async function confirmTheRide  () {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, 
    {
      rideId: rideDetails._id
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    setconfirmRidePopupPanel(true)
  }

  useGSAP(function(){
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel]);

  useGSAP(function(){
    if(confirmRidePopupPanel){
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
      <img
          className="w-28 mb-8"
          src="/public/rideease-logo.png"
        />
        <Link
          to="/captain-logout"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <LiveTracking />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails captain={captain}/>
      </div>
      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <RidePopup setridePopupPanel={setridePopupPanel} setconfirmRidePopupPanel={setconfirmRidePopupPanel} rideDetails={rideDetails} confirmTheRide={confirmTheRide}/>
      </div>
      <div ref={confirmRidePopupPanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <ConfirmRidePopup setconfirmRidePopupPanel={setconfirmRidePopupPanel} setridePopupPanel={setridePopupPanel} rideDetails={rideDetails}/>
      </div>
    </div>
  );
};

export default CaptainHome;
