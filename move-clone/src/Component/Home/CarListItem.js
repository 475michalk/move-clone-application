import React from 'react';
import { HiUser } from 'react-icons/hi';

function CarListItem({ car, distance, onClick, isSelected }) {
    return (
        <div onClick={onClick} className={`mt-2 p-2 rounded border ${isSelected ? 'border-black border-2' : 'border-gray-300'} cursor-pointer`} style={{position: 'relative'}}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                    <img src={car.image} alt={car.name} className="img-fluid" style={{ maxWidth: "100px", height: "auto" }} />
                    <div>
                        <h4 className={`font-semibold text-8 d-flex gap-2 items-center ${isSelected ? 'text-black' : ''}`}>
                            {car.name}
                            <span className={`d-flex gap-2 font-normal text-10 items-center ${isSelected ? 'text-black' : ''}`}>
                                <HiUser size={18} />{car.seat}
                            </span>
                        </h4>
                        <p className={`text-8 ${isSelected ? 'text-black' : ''}`}>{car.desc}</p>
                    </div>
                </div>
                <h4 className={`text-8 font-semibold ${isSelected ? 'text-black' : ''}`}>
                    ${(car.amount * distance).toFixed(2)}
                </h4>
            </div>
            {isSelected && <div className="border-black border-6 rounded-lg" style={{position: 'absolute', top: '-6px', left: '-6px', right: '-6px', bottom: '-6px'}}></div>}
        </div>
    );
}

export default CarListItem;
