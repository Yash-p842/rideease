import axios from "axios";
import {Captain} from '../models/captain.model.js'
import ApiError from "../utils/ApiError.js";

export const getAddressCoordinate = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API}`
    );

    if (response.data.results.length === 0) {
      throw new ApiError(400, "No such address found");
    }

    const { lat, lng } = response.data.results[0].geometry.location;

    return {
      lat,
      lng,
    };
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "something went wrong while fetching address");
  }
};

export const getDistanceTimeService = async (origin, destination) => {
  if (!origin || !destination) {
    throw new ApiError(400, "origin and destination are required");
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API}`
    );

    

    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new ApiError(400, "no routes found");
      }

    
      return response.data.rows[0].elements[0];
    } else {
      throw new ApiError(
        400,
        "something went wrong while fetching distance and time"
      );
    }
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "something went wrong while fetching distance and time"
    );
  }
};

export const getAutoSuggestionsService = async (input) => {
  if (!input) {
    return []
    // throw new ApiError(400, "address is required");
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_MAPS_API}`
    );

    if(response.data.status === 'OK'){
        return response.data.predictions
    }

  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "something went wrong while fetching suggestions"
    );
  }
};

export const getCaptainsInRadius = async(ltd, lng, radius) => {


  const captains = await Captain.find({
    location: {
        $geoWithin: {
            $centerSphere: [ [ ltd, lng ], radius / 6371 ]
        }
    }
});

  

  return captains
}
