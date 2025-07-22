import "leaflet/dist/leaflet.css";
import {MapContainer,TileLayer} from "react-leaflet";

const App = ()=>{
  // @ts-ignore
  return(
      <div>
          <MapContainer center={[48.85, 2.356]} zoom={13} className={'h-[50vh] w-full'}>
              <TileLayer
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"


              />

          </MapContainer>

      </div>
  )
}
export default App;
