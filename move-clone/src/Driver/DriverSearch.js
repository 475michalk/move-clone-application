import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Spinner } from 'react-bootstrap';
import { Context } from "./Context/Context";
import DriverInput from "./DriverInput";
import { addDriverToServer, fetchDriver, fetchDriverById, postDriver } from "../Redux/slices/drivers";
import { useDispatch, useSelector } from "react-redux";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import gif from "../img/gifSendEmail~1.gif"
import { fetchDriverReviews, fetchReview, fetchReviewById } from "../Redux/slices/review";
import axios from "axios";

function DriverSearch() {
    const { source, setSource } = useContext(Context);
    const [distance, setDistance] = useState();
    const [showModal, setShowModal] = useState(false);
    const [verificationModalOpen, setVerificationModalOpen] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false); // הוספנו משתנה חדש לצורך ניהול מצב השליחה של המייל
    const [showAddDriverModal, setShowAddDriverModal] = useState(false); // הוספנו את המשתנה לצורך הצגת מודל הביקורת של הנהג
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useClerk();
    const [serverResponse, setServerResponse] = useState('');
    const [verificationFailed, setVerificationFailed] = useState(false);
    const driverReviews = useSelector(state => state.driver.data); // לשים לב שאני מניח שהמיקום של הנתונים ב-state הוא state.driver.reviews, ניתן לשנות זאת לפי מיקום הנתונים ב-store
    const [review, setReview] = useState([]);



    const userEmail = user && user.emailAddresses.find(email => email.verification.status === 'verified');
    const userEmailAddress = userEmail ? userEmail.emailAddress : '';

    const handleProceedToVerification = async () => {
        if (source && user) {
            setSendingEmail(true); // מעדכנים את המשתנה לערך true בזמן שליחת המייל
            const userEmail = user.emailAddresses.find(email => email.verification.status === 'verified');
            try {

                const response = await dispatch(addDriverToServer({
                    nameDriver: user.fullName,
                    status: true,
                    lat: source.lat,
                    lng: source.lng,
                    email: userEmail.emailAddress,
                    Password: "",
                    phoneNumber: ""
                }));
                setServerResponse(response.payload.verificationCode);
                console.log(serverResponse, "response.data");
                setVerificationModalOpen(true);
            } catch (error) {
                console.error('Error adding driver to server:', error.message);
            } finally {
                setSendingEmail(false); // לאחר הסיום של שליחת המייל, מעדכנים את המשתנה לערך false
            }
        }
    };
    useEffect(() => {
        const fetchReview = async () => {
            try {

                const response = await axios.get('https://localhost:7185/api/Ordering');
                setReview(response.data);
            } catch (error) {
                console.error('Error fetching Review:', error);
            }
        };
        fetchReview();
    }, []);

    const handleVerification = () => {
        console.log(serverResponse);
        if (verificationCode === serverResponse) {
            console.log('Verification code is correct.');
            setVerificationModalOpen(false);
            setShowModal(false);
            setVerificationCode('');
            setVerificationFailed(false);

        } else {
            console.log('Verification code is incorrect.');
            setVerificationFailed(true);

        }
    };

    useEffect(() => {
        if (source) {
            console.log(source);
        }
    }, [source]);

    const closeModal = () => {
        setShowModal(false);
        setVerificationCode('');
        setVerificationFailed(false);
    };
    // const drivers = useSelector(state => state.driver.data); // אנחנו משתמשים ב- useSelector כדי לקבל את רשימת הנהגים מה-Redux
    const [driverRating, setDriverRating] = useState(null);
    const [driverComment, setDriverComment] = useState('');
    const [driverReview, setDriverReviews] = useState([]);


    const Show = async () => {
        
        const id = user.emailAddresses.find(email => email.verification.status === 'verified');
        
        await dispatch(fetchDriver()).then(driverResponse => {
            const driverData = driverResponse.payload;
            const driver = driverData.find(driver => driver.email === id.emailAddress);
            
            console.log(driver.id); // Assuming driver.id is the ID you want to match with

            if (driver) {
                
                dispatch(fetchReview()).then(reviewResponse => {
                    const reviewData = reviewResponse.payload;
                    const driverReviews = reviewData.filter(review => review.driverId === driver.id);

                    // Here you can display the ratings in the popup panel using driverReviews
                    console.log('Driver Reviews:', driverReviews);
                    driverReviews.forEach(review => {
                        console.log('Rating:', review.rating);
                        console.log('Comment:', review.comment);
                    });

                    setDriverReviews(driverReviews);
                    setShowAddDriverModal(true); // Displays the modal with the information
                }).catch(error => {
                    console.error('Error fetching review data:', error.message);
                });
            } else {
                console.error('Driver not found');
            }
        }).catch(error => {
            console.error('Error fetching driver data:', error.message);
        });
    };



    let counter = 1;

    return (
        <div>
            <div className="p-2 md:pd-6 border-[2px] rounded-xl">
                <h4 className="text-18 font-bold">Get a move</h4>
                <DriverInput type='source' />
                <button className="p-3 bg-black w-full mt-5 text-white rounded-lg"
                    onClick={() => setShowModal(true)} >Add</button>
            </div>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    Do you want to proceed to verification?
                    {sendingEmail && ( // מציג את הגלגל רק כאשר sendingEmail הוא true
                        <div className="text-center">
                            <img src={gif} width={150} height={150} />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" style={{ backgroundColor: '#80cbc4', borderColor: '#80cbc4' }} onClick={handleProceedToVerification}>Proceed to Verification</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={verificationModalOpen} onHide={() => setVerificationModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Verification Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Enter your Password of your Email: {userEmailAddress}</div>
                    <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} maxLength={4} minLength={4} />
                    {verificationFailed && <p className="text-red-500" style={{ color: 'red' }}>Verification code is incorrect. Please try again.</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setVerificationModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" style={{ backgroundColor: '#80cbc4', borderColor: '#80cbc4' }} onClick={handleVerification}>Verify</Button>
                </Modal.Footer>
            </Modal>
            <button className="p-3 bg-black w-full mt-5 text-white rounded-lg" onClick={Show}>Show your Review</button>
            <Modal show={showAddDriverModal} onHide={() => setShowAddDriverModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Driver Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {driverReview && driverReview.map(review => (
                        <div key={review.id}>
                            <p>{counter++}</p>
                            <p>Rating: {review.rating}</p>
                            <p>Comment: {review.comment}</p>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddDriverModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default DriverSearch;