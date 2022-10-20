import React, {FC, useEffect} from 'react';
import {useForm} from "react-hook-form";
import './Update_train.css';
import {useNavigate, useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {ITrain} from "../../interfaces";
import {getTrainById, updateTrain} from "../../store";

const UpdateTrain: FC = () => {
    const {handleSubmit, register} = useForm();
    const navigate = useNavigate();
    const {trains, train} = useAppSelector((state) => state.trainReducer);
    const dispatch = useAppDispatch();
    const params = useParams();

    let trainFind: ITrain | undefined = trains.find(value => value.id === Number(params.id));


    useEffect(() => {
        if (typeof trainFind === "undefined" && params.id) {
            dispatch(getTrainById(params.id))
        }
    }, [params, trainFind])


    const update_train = async (data: ITrain) => {
        let {name, description, route, arrival_time, departure_time} = data;
        const obJToUpdate = {
            name: name === '' ? train.name : name,
            description: description === '' ? train.description : description,
            route: route === '' ? train.route : route,
            arrival_time: Number(arrival_time) === 0 ? train.arrival_time : Number(arrival_time),
            departure_time: Number(departure_time) === 0 ? train.departure_time : Number(departure_time),
        }
        await dispatch(
            updateTrain({
                id: typeof params.id === "string" ? params.id : '',
                data: obJToUpdate
            })
        )
        navigate('/')
    }
    return (
        <div>
            <form onSubmit={handleSubmit(update_train)} className={"form"}>
                Name <input type="text" {...register("name")}
                            defaultValue={trainFind ? `${trainFind?.name}` : train.name}/>
                <hr/>
                Description <input type="text" {...register("description")}
                                   defaultValue={trainFind ? `${trainFind?.description}` : train.description}/>
                <hr/>
                Route <input type="text" {...register("route")}
                             defaultValue={trainFind ? `${trainFind?.route}` : train.route}/>
                Введіть маршрут поїзда, маршрут має складати міста арглійською мовою через дефіз <br/>
                Зараз можливі тильки 4 міста -- Lviv, Franik, Odessa, Rivne
                <hr/>
                Arrival time <input type="number" {...register("arrival_time")}
                                    defaultValue={trainFind ? `${trainFind?.arrival_time}` : train.arrival_time}/>
                <hr/>
                Departure time <input type="number" {...register("departure_time")}
                                      defaultValue={trainFind ? `${trainFind?.departure_time}` : train.departure_time}/>
                <button>Update train</button>
            </form>
        </div>
    );
};

export {UpdateTrain};
