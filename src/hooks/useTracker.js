import axios from 'axios'
import {VITE_API_KEY} from "../constants";
import {useQuery} from "@tanstack/react-query";


 const useTracker = async (ip_address) => {
    const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${VITE_API_KEY}&ipAddress=${ip_address}`
    );
    return response.data;
};


 export default useTracker;