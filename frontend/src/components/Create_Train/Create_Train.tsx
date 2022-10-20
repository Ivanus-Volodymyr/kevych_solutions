import React from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {useAppDispatch} from "../../hooks";
import {ITrain} from "../../interfaces";
import {createTrain} from "../../store";

const CreateTrain = () => {
    const {handleSubmit, register} = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const create = (data: ITrain) => {
        dispatch(createTrain(data))
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={handleSubmit(create)} className={"form"}>
                Name <input type="text" {...register("name")} placeholder={"name"}/>
                <hr/>
                Description <input type="text" {...register("description")} placeholder={"description"}/>
                <hr/>
                Route <input type="text" {...register("route")} placeholder={"Lviv-Rivne-Franic"}/>
                Введіть маршрут поїзда, маршрут має складати міста арглійською мовою через дефіз
                <hr/>
                Arrival time <input type="number" {...register("arrival_time")} placeholder={"arrival time"}/>
                <hr/>
                Departure time <input type="number" {...register("departure_time")} placeholder={"departure time"}/>
                <button>Create train</button>
            </form>
        </div>

    );
};

export {CreateTrain};
