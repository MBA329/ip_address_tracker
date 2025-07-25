import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import bg_desktop from "./assets/images/pattern-bg-desktop.png";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useTracker from "./hooks/useTracker.js";
import { notify } from "./constants/notify.js";

const App = () => {
    const [address, setAddress] = useState("");

    const { mutate, data, isPending } = useMutation({
        mutationFn: useTracker,
    });

    const handleSubmit = () => {
        if (!address) return;
        mutate(address, {
            onError: (error) => {
                notify(error.message, "error");
            },
        });
    };

    return (
        <section className="relative">
            {/* Top Hero Section */}
            <div
                style={{
                    backgroundImage: `url(${bg_desktop})`,
                    width: "100%",
                    height: "30vh",
                }}
                className="flex flex-col shadow justify-center items-center gap-4"
            >
                <p className="text-white text-2xl md:text-4xl font-bold">
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

                        className="bg-white text-gray-900 rounded-l focus:outline-none md:w-xs p-4 h-[40px]"
                        type="text"
                    />
                    <button
                        type="submit"
                        className="flex rounded-r p-3 cursor-pointer justify-center items-center bg-gray-900"
                    >
                        <ChevronRight className="text-white" />
                    </button>
                </form>
            </div>

            {/* Floating Info Card */}
            <div
                style={{ zIndex: 1000 }}
                className="absolute shadow-lg left-1/2 -translate-x-1/2 top-[22vh]
             bg-white h-[100px]  mx-auto p-5 w-[80vw]
              rounded-md"
            >
                {isPending ? (
                    <p>Loading...</p>
                ) : (
                    <div className={'flex items-center justify-evenly my-auto gap-4 '}>
                        <div className=" p-4">
                            <p className="text-xs text-gray-500">IP ADDRESS</p>
                            <p>{data?.ip || "—"}</p>
                            <div className={'w-1 bg-gray-700 h-full m-5'}></div>
                        </div>

                        <div className="border-r p-4">
                            <p className="text-xs text-gray-500">LOCATION</p>
                            <p>{data?.location?.country || "—"}</p>
                        </div>

                        <div className={'m-5'}
                        >
                            <p className="text-xs text-gray-500">ISP</p>
                            <p>{data?.isp || "—"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">TIMEZONE</p>
                            <p></p>
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
                center={[48.85, 2.356]}
                zoom={13}
                className="w-full"

            >
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
        </section>
    );
};

export default App;
