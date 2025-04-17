import React, {useState, useRef} from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const [finishRidePanel, setfinishRidePanel] = useState(false)

    const finishRidePanelRef = useRef(null)

    const location = useLocation()
    const ride = location.state?.ride
    console.log(ride)

    useGSAP(function(){
        if(finishRidePanel){
          gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(0)'
          })
        }else{
          gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
          })
        }
      }, [finishRidePanel]);

  return (
    <div className="h-screen relative">
                
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
      <div className="h-4/5 ">
        <LiveTracking />
      </div>
      <div className="h-1/5 p-6 bg-yellow-400 flex items-center justify-between relative" 
      onClick={()=>{
          setfinishRidePanel(true)
      }}
      >
      <h5
        className="p-1 text-center w-[95%] absolute top-0 "
        onClick={() => {
          
        }}
      >
        <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
      </h5>
         <h4 className='text-xl font-semibold'>4 KM away</h4>
         <button className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <FinishRide setfinishRidePanel={setfinishRidePanel} ride={ride}/>
      </div>
    </div>
  )
}

export default CaptainRiding