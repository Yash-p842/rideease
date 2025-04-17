import Ride from "../models/ride.model.js";
import { getDistanceTimeService } from "../services/maps.service.js";
import ApiError from "../utils/ApiError.js";
import * as crypto from 'crypto'

export const createRide = async ({
    userId, pickup, destination, vehicleType
}) => {

    if(!userId || !pickup || !destination || !vehicleType){
        throw new ApiError(400, 'All fields are required')
    }

    const fare = await getFare(pickup, destination)

    
    try {
        const ride = await Ride.create({
            user: userId,
            pickup,
            destination,
            otp: getOtp(4),
            fare: fare[vehicleType]
        })


        return ride
    } catch (error) {
        console.log(error)
        throw new ApiError(500, 'something went wrong while creating ride')
    }

}

export const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new ApiError(400, "Pickup and Destination are required");
  }

  const distanceTime = await getDistanceTimeService(pickup, destination);


  try {
    const baseFare = 50; 
    const farePerKm = {
      auto: 10,
      car: 15,
      motorcycle: 8,
    };
  
    const fare = {
      auto: baseFare + (distanceTime.distance.value / 1000) * farePerKm.auto,
      car: baseFare + (distanceTime.distance.value / 1000) * farePerKm.car,
      moto:
        baseFare + (distanceTime.distance.value / 1000) * farePerKm.motorcycle,
    };
  
    return fare;
  } catch (error) {
    console.log(error)
    throw new ApiError(500, 'error calculating fare')
  }
}

function getOtp(num){
  const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString()
  return otp
}