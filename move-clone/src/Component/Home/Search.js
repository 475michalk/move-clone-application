/* global google */

import React, { useContext, useEffect, useState } from "react";
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import InputItem from "./InputItem";
import CarListOptions from "./CarListOptions";
import { addOrderingToServer, setSelectedDriverId, setSelectedUserId } from "../../Redux/slices/orders";
import { useDispatch, useSelector } from "react-redux";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { addUserToServer, fetchUser } from "../../Redux/slices/users";
import axios from "axios";

function Search() {
    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContext);
    const [distance, setDistance] = useState();
    const [selectedCar, setSelectedCar] = useState(null); // Define selectedCar state
    const selectedUserId = useSelector(state => state.users.User);
    const [Userid,setUserid]=useState(0);
    const dispatch = useDispatch();

    const { user } = useClerk();
    const navigate = useNavigate();
    let idUser;
    const calculateDistance = async() => {
        const dist = google.maps.geometry.spherical.computeDistanceBetween(
            { lat: source.lat, lng: source.lng },
            { lat: destination.lat, lng: destination.lng }
        );

        console.log(dist * 0.000621374);
        setDistance(dist * 0.000621374);

        if (user) {
            debugger
            const userEmail = user.emailAddresses.find(email => email.verification.status === 'verified');
            if (userEmail) {
                console.log('User email:', userEmail.emailAddress);
                await dispatch(fetchUser()).then((userData) => {
                    debugger
                    console.log(user.fullName+"user.fullName");
                    console.log(userEmail.emailAddress);
                     dispatch(addUserToServer({ username:user.fullName,email: userEmail.emailAddress, password: 'YourPassword'  }));
                    
                    const userId = dispatch(fetchUser()).then(async (userI) => {
                        //    const id= x=>x.email===userEmail.emailAddress
                        const response = await axios.get('https://localhost:7185/api/User');
                        console.log(response.data);
                        const fetchedUser = response.data.find(x => x.email === userEmail.emailAddress);
                        const userId = fetchedUser ? fetchedUser.id : null;
                        console.log(userId);
                        setUserid(userId); // Assuming setUserid is a function for updating the user ID
                    });
                });
            } else {
                console.log('User does not have a verified email address.');
            }
            console.log('User username:', user.firstName);
        }
        
    };


    const handleCarSelection = (selectedCar) => {
        console.log('Selected Car:', selectedCar);
        setSelectedCar(selectedCar); // Set the selected car
    };


    useEffect(() => {
        if (source) {
            console.log(source);
        }
        if (destination) {
            console.log(destination);
        }
    }, [source, destination]);

    return (
        <div>
            <div className="p-2 md:pd-6 border-[2px] rounded-xl">
                <h4 className="text-18 font-bold">Get a move</h4>
                <InputItem type='source' />
                <InputItem type='destination' />
                <button className="p-3 bg-black w-full mt-5 text-white rounded-lg"
                    onClick={() => calculateDistance()}
                >Search</button>
            </div>
            {distance ? <CarListOptions id={Userid} distance={distance} source={source} destination={destination} onRequestCar={handleCarSelection} /> : null}
            {selectedCar ? <button>Add</button> : null}
        </div>
    );
}

export default Search;
