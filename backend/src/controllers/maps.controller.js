import { getAddressCoordinate, getDistanceTimeService, getAutoSuggestionsService } from "../services/maps.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { validationResult } from 'express-validator'
import { getFare } from "../services/ride.service.js";

export const getCoordinates = async (req, res) => {

    if (!validationResult(req).isEmpty()) {
        throw new ApiError(400, validationResult(req), 'address query invalid')
    }

    const { address } = req.query

    try {
        const coordinates = await getAddressCoordinate(address)
        return res
        .status(200)
        .json(new ApiResponse(200, coordinates, 'Coordinates fetched successfully'))
        
    } catch (error) {
        console.log(error)
        throw new ApiError(500, 'something went wrong while fetching coordinates')
    }

}

export const getDistanceTime = async (req, res) => {

    if(!validationResult(req).isEmpty()) {
        throw new ApiError(400, validationResult(req), 'origin or destination query invalid')
    }

    const { pickup, destination } = req.query

    try {
        const distanceTime = await getDistanceTimeService(pickup, destination)
        return res
        .status(200)
        .json(new ApiResponse(200, distanceTime, 'Distance and time fetched successfully'))
    } catch (error) {
        console.log(error)
        throw new ApiError(500, 'something went wrong while fetching distance and time')
    }


}

export const getAutoSuggestions = async (req, res) => {
    
    if(!validationResult(req).isEmpty()) {
        console.log(req.query)   
        throw new ApiError(400, req.query, 'input query invalid')
    }

    const { input } = req.query

    try {
        const suggestions = await getAutoSuggestionsService(input)
        return res
        .status(200)
        .json(new ApiResponse(200, suggestions, 'Suggestions fetched successfully'))
    } catch (error) {
        console.log(error)
        throw new ApiError(500, 'something went wrong while fetching suggestions')
    }
}

export const getRates = async (req, res) => {

    if(!validationResult(req).isEmpty()){
        throw new ApiError(400, 'validation error while fare')
    }

    const {pickup, destination} = req.query
   

    try {
        const response = await getFare(pickup, destination)

        return res
        .status(200)
        .json(new ApiResponse(200, response, 'fares fetched successfully'))
    } catch (error) {
        console.log(error)

        // throw new ApiError(500, 'error while fetching fares')
    }

}