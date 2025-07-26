import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet";
import bg_desktop from "./assets/images/pattern-bg-desktop.png";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useTracker from "./hooks/useTracker.js";
import { notify } from "./constants/notify.js";
import {Toaster} from "sonner";
import ChangeView from "./hooks/useMap.js";
import {Icon} from "leaflet"
import Location from "./assets/images/location-pin.png"

const App = () => {


    const markers = [
        { geocode:[48.68,2.3522],popup:"hello, I am a pop up"},
        {
            geocode:[48.68,2.3522],popup:"hello, I am a pop up"
        },
        {geocode:[48.68,2.3522],popup:"hello, I am a pop up"}


    ]
    const customIcon = new Icon({
        iconUrl: Location,
        iconSize: [35, 35],
    })
    const [address, setAddress] = useState("");
    const [coords,setCoords] = useState([48.85, 2.356])

    const { mutate, data, isPending } = useMutation({
        mutationFn: useTracker,
    });

    const handleSubmit = () => {
        if (address === "") {
            notify("Please enter an IP address or domain", "error");
            return;
        }
        mutate(address, {
            onError: (error) => {
                notify(error.message, "error");
            },
            onSuccess:(data)=>{
                const lat = data.lat || 54.23;
                const lng = data.lng || 54.23;
                setCoords([lat,lng]);

            }
        });
    };


    return (

        <section className="relative">
            <Toaster
                position="top-center"
                toastOptions={{
                    className: "rounded-xl border border-gray-200 shadow-lg",
                    style: {


                        fontWeight: "500",
                    },
                    success: {
                        className: " text-green-500 border-green",
                    },
                    error: {
                        className: "text-red-500",
                    },
                }}
            />

            {/* Top Hero Section */}
            <div
                style={{
                    backgroundImage: `url(${bg_desktop})`,
                    width: "100%",
                    height: "30vh",
                }}
                className="flex flex-col shadow   items-center gap-4"
            >
                <p className="text-white text-2xl mt-4  md:text-4xl font-bold">
                    IP Address Tracker
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="flex"
                >
                    <input
                        value={address}
                        placeholder="Search for any IP address or domain"
                        onChange={(event) => {
                            setAddress(event.target.value);
                        }}

                        className="bg-white w-[50vw] text-gray-900 rounded-l focus:outline-none p-4 h-[40px]"
                        type="text"
                    />
                    <button
                        type="submit"
                        className="flex rounded-r h-[40px] p-3 cursor-pointer justify-center items-center bg-gray-900"
                    >
                        <ChevronRight className="text-white" />
                    </button>
                </form>
            </div>

            {/* Floating Info Card */}
            <div
                style={{ zIndex: 1000 }}
                className="absolute flex items-center shadow-lg left-1/2 -translate-x-1/2 top-[22vh]
             bg-white md:h-[100px]  mx-auto  md:w-[80vw] w-[50vw]
              rounded-md"
            >
                {isPending ? (
                    <p className={'text-center'}>Loading...</p>
                ) : (
                    <div className={'flex flex-col md:flex-row items-center p-2 w-full justify-evenly my-auto gap-3 md:gap-4 '}>
                        <div className=" md:p-4 flex flex-col items-center justify-center gap-3">
                            <p className="text-xs text-gray-500">IP ADDRESS</p>
                            <p className={'font-bold text-lg'}>{data?.ip || "—"}</p>

                        </div>


                        <div className=" md:p-4 flex flex-col items-center justify-center md:gap-3">
                            <p className="text-xs text-gray-500">LOCATION</p>
                            <p className={'font-bold text-lg'}>{data?.location?.country || "—"}</p>
                        </div>

                        <div className={'items-center  flex flex-col md:gap-3'}
                        >
                            <p className="text-xs text-gray-500">TIMEZONE</p>
                            <p className={'font-bold text-lg'}>{data?.location.timezone || "—"}</p>
                        </div>
                        <div className={'flex flex-col items-center justify-center md:gap-3'}>
                            <p className="text-xs text-gray-500">ISP</p>
                            <p className={'font-bold text-center text-lg'}>{data?.isp || "—"}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Map Section */}
            <MapContainer
                style={{
                    height: "70vh",
                    zIndex:"4"
                }}
                center={coords}
                zoom={13}
                className="w-full"

            >
                <ChangeView coordinate={coords}/>
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {
                    data?.location?.lat && data?.location?.lng && (
                        <Marker
                        position={coords}
                        />
                    )
                }
                {markers.map((marker)=>(
                    <Marker position={marker.geocode} />
                ))}
            </MapContainer>
        </section>
    );
};

export default App;
