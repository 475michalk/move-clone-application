import React, { useState } from "react";
import { CarListData } from "./CarListDate";
import CarListItem from "./CarListItem";
import { addOrderingToServer, fetchOrdering, fetchOrderingById } from "../../Redux/slices/orders";
import { useDispatch, useSelector } from "react-redux";
import { useClerk } from "@clerk/clerk-react";
import { fetchUser, fetchUserEmail } from "../../Redux/slices/users";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CarListOptions({ id, distance, source, destination }) {
  const [selectedCar, setSelectedCar] = useState({});
  const [activeIndex, setActivedCar] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const driverCoordinates = useSelector(state => state.driver.data);
  const selectedDriverId = useSelector(state => state.orders.selectedDriverId);
  const selectedUserId = useSelector(state => state.users.User);
  const { user } = useClerk();
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/Home');
  };
  const [showModal, setShowModal] = useState(false);

  //Add ordering
  const addOrdering = async () => {


    if (source && destination && selectedCar && selectedDriverId) {

      debugger
      try {
        const res = await dispatch(addOrderingToServer({
          iduser: id,
          iddriver: selectedDriverId,
          status: true,
          choiseCar: selectedCar.name,
          source: source.label,
          destination: destination.label,
          driveTime: new Date().toISOString(),
        }));
        debugger
        const response = await dispatch(fetchOrdering());
        if (response && response.payload) {
          const allOrders = response.payload;
          debugger
          if (allOrders.length > 0) {
            const lastOrder = allOrders[allOrders.length - 1];
            const lastOrderId = lastOrder.id;
            console.log('Last added order ID:', lastOrderId);
            debugger
            handleShowModal();
            await dispatch(fetchOrderingById(lastOrderId))

          }
          else {
            console.log('No orders found.');
          }
        } else {
          console.log('Error fetching orders.');
        }
      }
      catch (error) {
        console.error('Error adding order:', error);
      }
    } else {
      console.log('User not found');
    }
  };


  return (
    <div className="mt-5 overflow-auto h-[250px]">
      <h4 className="text-15 font-bold">Recommended</h4>
      {CarListData.map((item, index) => (
        <div
          className={`cursor-pointer p-2 rounded-md border-black
          ${activeIndex == index ? 'border-[3px]' : null}`}
          onClick={() => {
            setActivedCar(index);
            setSelectedCar(item)
          }}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}

      {selectedCar.name && (
        <div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg ">
          <h4>Make Payment For</h4>
          <button
            className="p-3 bg-black text-white text-center"
            onClick={addOrdering}

          >
            Request {selectedCar.name}
          </button>
        </div>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>The order is on its way to you</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for your invitation. <br />The order confirmation has been sent to your email, please check your inbox.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {/* Update the text on the Confirm Payment button */}

        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default CarListOptions;
