/* global google */
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import { Context } from "./Context/Context";
import DriverSearch from "./DriverSearch";
import DriverMap from "./DriverMap";

const GOOGLEMAP_KEY = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

const Maps = () => {
  const [source, setSource] = useState([]);

  return (
    <Context.Provider  value={{ source, setSource }}>
        <LoadScript libraries={['places']} googleMapsApiKey={GOOGLEMAP_KEY}>
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-md-8 order-md-2">
                <DriverMap />
              </div>
              <div className="col-md-4 order-md-1">
                <DriverSearch />
              </div>
            </div>
          </div>
        </LoadScript>
    </Context.Provider>
  );
}
export default Maps;
