import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormDriver = () => {
    const refName = useRef();
    const refEmail = useRef();
    const refPhone = useRef();
    const navigate = useNavigate();


    return (
        <div className="container">
            <form>
                <div className="row">
                    <h3>Driver details </h3>
                    <label htmlFor="name"><i className="fa fa-user"></i> שם מלא</label>
                    <input ref={refName} type="text" maxLength="25" id="fname" name="firstname" placeholder="John M. Doe" required />
                    {/* {!isValidName && isConfirm && (
                        <span className="error-message">שם לא תקין</span>
                    )} */}
                    <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                    <input ref={refEmail} type="text" id="email" name="email" placeholder="john@example.com" />
                    {/* {!isValidEmail && isConfirm && (
                        <span className="error-message">אימייל לא תקין</span>
                    )} */}
                    <label><i className="fa fa-envelope"></i> Telephone</label>
                    <input ref={refPhone} type="text" id="phone" name="phone" placeholder="050-2345678" />
                    {/* {!isValidPhoneNumber && isConfirm && (
                        <span className="error-message">מספר טלפון לא תקין</span>
                    )} */}
                    <input className="btn" type='button' value={"אישור"} onClick={() => navigate('/DriverMap')} />
                    <div className="row"></div>
                </div>
            </form>
        </div>
    )
}
{
    // isCorrect && (
    //     <div>

    //     </div>
    //);
}

export default FormDriver;