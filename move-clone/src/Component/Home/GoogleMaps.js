import { SourceContext } from "../Context/SourceContext";
import MapsSection from "./MapsSection";
import Search from "./Search";
import { DestinationContext } from "../Context/DestinationContext";
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";

const GOOGLEMAP_KEY = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

const GoogleMap = () => {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript libraries={['places']} googleMapsApiKey={GOOGLEMAP_KEY}>
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-md-8 order-md-2">
                <MapsSection />
              </div>
              <div className="col-md-4 order-md-1">
                <Search />
              </div>
            </div>
          </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
export default GoogleMap;
