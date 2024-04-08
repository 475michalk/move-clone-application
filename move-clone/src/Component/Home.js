import React, { useEffect } from 'react';
import { SignOutButton, SignInButton, SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import backgroundImg from "../img/bg-01.png";
import axios from 'axios';

const Home = () => {
  const { openSignIn } = useClerk();
  const navigate = useNavigate();



  useEffect(() => {
    const checkAndAutoLogin = async () => {
      const user = await openSignIn();
      if (user) {
        console.log("המשתמש התחבר:", user);
        // הפנייה לעמוד חדש בכניסה
        navigate('/maps')
       
      }
    };

    checkAndAutoLogin();
  }, [openSignIn, navigate]);

  const containerStyle = {
    background: `url(${backgroundImg}) center/cover no-repeat`,
    height: "86.5vh",
    display: "flex",
    overflow: "hidden", // הוספנו עיצוב כך שהתמונה לא תגלול מחוץ למסגרת
    flexDirection: "column",
    backgroundColor: "#80cbc4", // הוספתי צבע רקע כמו שציינת
  };
  
  
  return (
   
  
     <div style={containerStyle}>
    {/* //   <SignedOut>
    //     <SignInButton />
    //     <p></p>
    //   </SignedOut>
    //   <SignedIn>
    //     <SignOutButton onClick={() => navigate('/maps')} />
    //     <p></p>
        
    //   </SignedIn> */}
     </div>
  );
}

export default Home;
