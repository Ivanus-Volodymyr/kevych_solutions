import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

import {ITrain} from "../../interfaces";
import './Train.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {deleteTrainById} from "../../store";

const Train: FC<{ train: ITrain }> = ({train}) => {
    const dispatch = useAppDispatch();
    const {trains} = useAppSelector((state) => state.trainReducer);
    const navigate = useNavigate();

    const deleteTrain = (id: number) => {
        dispatch(deleteTrainById(id.toString()))
        const index = trains.findIndex(value => value.id === id);
        trains.slice(index, 1)
    }
    return (
        <div className={"train"}>
            <h3 className={"info"}>{train.id}</h3>
            <h3 className={"info"}>{train.name}</h3>
            <h3 className={"info"}>{train.route}</h3>
            <h3 className={"info"}>Arrival Time <span>{train.arrival_time}</span> - Departure
                Time <span>{train.departure_time}</span></h3>
            <h3 className={"info"}>{train.description}</h3>
            <button onClick={() => navigate(`/${train.id} `)}>Update</button>
            <button onClick={() => {
                if (train.id) {
                    deleteTrain(train.id)
                }
            }}>Delete Train from list
            </button>
        </div>
    );
};

export {Train};
