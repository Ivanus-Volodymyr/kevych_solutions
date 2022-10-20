import React, {FC, useEffect} from 'react';
import Select from 'react-select';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAllTrains, getTrainsByCity, getTrainsByName} from "../../store";
import {Train} from "../Train";
import './Trains.css'

const Trains: FC = () => {
    const dispatch = useAppDispatch();
    const {handleSubmit, register, reset} = useForm();
    const navigate = useNavigate();
    const {
        trains,
        trainsByName,
        cities,
        rule,
        searchTrainsArray,
        searchStatus,
        searchWord
    } = useAppSelector((state) => state.trainReducer);


    useEffect(() => {
        dispatch(getAllTrains())
    }, [rule, searchWord, trains, searchStatus, searchTrainsArray])

    const selectByCityName = (data: any) => {
        dispatch(getTrainsByCity(data.value))
    }

    const search = (data: any) => {
        if (data.search && typeof data.search === "string") {
            dispatch(getTrainsByName(data.search))
        }
        console.log(searchTrainsArray)
        reset();
    }
    return (
        <div className={'main-block-train'}>
            <h4>Trains main page</h4>
            <h1>Ви можете обрати мосто звідки прямуєте</h1>
            <Select options={cities} onChange={selectByCityName} defaultValue={cities[0]}/>
            <hr/>
            <h3>Шукати поїзд за назвою</h3>
            <form onSubmit={handleSubmit(search)}>
                <input type="text" {...register('search')} />
                <button>Search</button>
            </form>
            <hr/>
            <h3>Ви також можете створити поїзд з маршрутом</h3>
            <div>
                <button onClick={() => navigate('/create')}>Create Train</button>
            </div>
            <hr/>
            {searchWord !== "" && <h2>Немає розультатів пошуку за назвою {searchWord}</h2>}
            <div>
                {
                    searchStatus && rule ? trains.map(value => <Train key={value.id} train={value}/>) :
                        searchStatus ? trainsByName.map(value => <Train key={value.id} train={value}/>) :
                            searchTrainsArray.map(value => <Train key={value.id} train={value}/>)
                }
            </div>
        </div>
    );
};

export {Trains} ;
