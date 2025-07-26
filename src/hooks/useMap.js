import {useMap} from "react-leaflet";
import {useEffect} from "react";

const ChangeView = ({coordinate})=>{
    const map = useMap();

    useEffect(()=>{
        if(coordinate){
            map.flyTo(coordinate,13,{animate:true,duration:1.5})
        }
    },[coordinate,map])
    return null;
}

export default ChangeView;