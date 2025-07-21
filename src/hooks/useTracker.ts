import axios from 'axios'
import {VITE_API_KEY} from "../constants";

interface TrackerResponse {
    ip:string;
    location:{
        country:string;
        region:string;
        timezone:string;
    },
    as:{
        asn:number;
        name:string;
        route:string;
        domain:string;
        type:string;
    }
    isp:string;
}

export const useTracker = async (ip_address: string): Promise<TrackerResponse> => {
    const response = await axios.get<TrackerResponse>(
        `https://geo.ipify.org/api/v2/country?apiKey=${VITE_API_KEY}&ipAddress=${ip_address}`
    );

    return response.data;
};