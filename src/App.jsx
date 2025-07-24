import "leaflet/dist/leaflet.css";
import {MapContainer,TileLayer} from "react-leaflet";
import bg_desktop from "./assets/images/pattern-bg-desktop.png";
import bg_mobile from "./assets/images/pattern-bg-mobile.png"
import {useState} from "react";
import {ChevronRight} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import useTracker from "./hooks/useTracker.js";

const App = ()=>{

    const [address,setAddress] = useState("");

    const {mutate,data,isPending,isError,error} = useMutation({
        mutationFn: useTracker
    })

    const handleSubmit = ()=>{

        if(!address) return;
        mutate(address)


    }
  return(
      <section className={'relative'}>
          <div
              style={{
                  backgroundImage: `url(${bg_desktop})`,
                  width:"100%",
                  height:"30vh",
          }}
              className={'flex flex-col justify-center items-center gap-4'}

          >
              <p className={'text-white text-2xl md:text-4xl font-bold'}>
                  IP Address Tracker
              </p>
              <form action={handleSubmit} className={'flex'}>
                  <input
                      value={address}
                      placeholder={"Search for  any ip address or domain"}
                      onChange={(event)=>{setAddress(event.target.value)}}
                className={'bg-white text-gray-900 rounded-l focus:outline-none md:w-xs p-4 h-[40px]'}
                  type={'text '}/>

                      <button  className={'flex rounded-r p-3 cursor-pointer justify-center items-center bg-gray-900'}>
                    <ChevronRight className={'text-white'}/>
                      </button>
              </form>
          </div>
          <MapContainer
              style={{
                  height:"70vh"
              }}
              center={[48.85, 2.356]} zoom={13} className={'w-full'}>
              <TileLayer
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

          </MapContainer>
          <div>
            <div>
                {isPending ? <p className={'text-white'}>Loading</p>:(
                    <div className={'bg-white h-12 absolute top-30 translate-x-[30%]'}>
                        <p>
                            {data?.isp}
                        </p>
                    </div>
                )}

            </div>
          </div>

      </section>
  )
}
export default App;
