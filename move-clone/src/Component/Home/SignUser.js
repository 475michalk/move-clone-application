// import React, { useEffect } from 'react';
// import { SignOutButton, SignInButton, SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
// import { useNavigate } from 'react-router-dom';

// function SignUser() {
//     const { openSignIn, user } = useClerk(); // קבלת נתוני המשתמש מ־Clerk
//     const navigate = useNavigate();

//     // useEffect(() => {
//     //     const checkAndAutoLogin = async () => {
//     //         if (user) { // בדיקה האם המשתמש מחובר
//     //             console.log("המשתמש התחבר:", user);
//     //             navigate('/maps', { replace: true });
//     //         } else {
//     //             const user = await openSignIn();
//     //             if (user) {
//     //                 console.log("המשתמש התחבר:", user);
//     //                 navigate('/maps', { replace: true });
//     //             }
//     //         }
//     //     };
//     //     checkAndAutoLogin();
//     // }, [openSignIn, navigate, user]); // הוספת 'user' לרשימת התלות, כך שה־useEffect יפעל כאשר המשתמש משתנה

//     const containerStyle = {
//         height: "86.5vh",
//         display: "flex",
//         overflow: "hidden",
//         flexDirection: "column",
//         backgroundColor: "#80cbc4",
//     };
  

//     console.log("הרכיב SignUser הופעל");
//     return (
//         <div style={containerStyle}>
//             <SignedOut >
//                 <SignInButton  />
//                 <p></p>
//             </SignedOut>
//             <SignedIn >
//                 <SignOutButton  />
//                 <p ></p>

//             </SignedIn >
//         </div>
//     );
// }

// export default SignUser;
