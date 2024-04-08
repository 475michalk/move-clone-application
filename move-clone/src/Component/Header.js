import React, { useEffect, useState } from 'react';
import { SignIn, SignOutButton, UserButton, useClerk } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import pack from '../img/package.png';
import taxi from '../img/taxi.png';
import logo from '../img/logo-02.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { addUserToServer, fetchUser } from '../Redux/slices/users';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Driver from '../img/move4.png';
import User from '../img/move4.png';
import starIcon from '../img/star-fill.svg';
import carIcon from '../img/car-front-fill.svg';
import userIcon from '../img/person-circle.svg';
import { colors } from '@mui/material';



function Header() {

    const { user } = useClerk();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    // useEffect(() => {
    //     if (user) {
    //         const userEmail = user.emailAddresses.find(email => email.verification.status === 'verified');

    //         //add User
    //         if (userEmail) {
    //             console.log('User email:', userEmail.emailAddress);
    //             dispatch(fetchUser()).then((userData) => {
    //                 // const emailExists = userData.email === userEmail.emailAddress;
    //                 // if (emailExists) {
    //                 dispatch(addUserToServer({ email: userEmail.emailAddress, password: 'YourPassword', username: user.firstName }));
    //                 // } else {
    //                 //     console.log("Email already exists in the database");
    //                 // }
    //             });
    //         } else {
    //             console.log('User does not have a verified email address.');
    //         }
    //         console.log('User username:', user.firstName);
    //     }
    // }, [user, dispatch]);

    // const headerMenu = [
    //     {
    //         id: 1,
    //         name: "Ride",
    //         icon: taxi
    //     },
    //     {
    //         id: 2,
    //         name: "Package",
    //         icon: pack
    //     }
    // ];



    return (
        <div className="p-5 pb-3 pl-10 border-b-4 border-gray-200 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
                <img src={logo} width={160} height={60} alt='Logo' onClick={() => navigate('/Home')} />
                {/* {headerMenu.map((item) => (
                    <div className="d-flex align-items-center" key={item.id}>
                        <img src={item.icon} width={30} height={30} alt={item.name} />
                        <h4 className="text-[14px] font-medium">{item.name}</h4>
                    </div>
                ))} */}
            </div>

            {/* <div>
                <button onClick={() => navigate('/SignDriver')}>Your Driver?</button>
            </div> */}

            <div className="d-flex justify-content-end align-items-right">
                <NavDropdown title={<span className="fa fa-bars"></span>} id="basic-nav-dropdown" drop="start" alignRight={false} className="mr-2">
                    <NavDropdown.Item onClick={(e) => e.stopPropagation()}><UserButton /></NavDropdown.Item>
                    {user ? (
                        <>
                            <NavDropdown.Item href="/DriverMap" className='take take-car' >
                                <img src={carIcon}  alt="User Icon"  /> Driver
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/maps" className='add-user'>
                                <img src={userIcon} alt="Car Icon" /> Order a driver to User
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/MyOrdering">
                                <img src={starIcon} alt="Star Icon" /> My Order
                            </NavDropdown.Item>

                            <NavDropdown.Item>
                                <SignOutButton onClick={() => navigate('/Home')} />
                            </NavDropdown.Item>
                        </>
                    ) : (
                        <NavDropdown.Item href="/Home">please Login</NavDropdown.Item>
                    )}
                </NavDropdown>

                {/* <UserButton /> */}
            </div>

        </div >
    );
}

export default Header;
