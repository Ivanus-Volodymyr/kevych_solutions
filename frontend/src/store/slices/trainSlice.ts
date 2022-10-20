import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IInitialState, ITrain, IUpdate} from "../../interfaces";
import {trainsService} from '../../services/trains.service'

const initialState: IInitialState = {
    trains: [] as ITrain[],
    trainsByName: [] as ITrain[],
    train: {} as ITrain,
    cities: [
        {value: '', label: 'All Trains in all city'},
        {value: 'Lviv', label: 'Lviv'},
        {value: 'Franik', label: 'Franik'},
        {value: 'Odessa', label: 'Odessa'},
        {value: 'Rivne', label: 'Rivne'},
    ],
    rule: true,
    searchStatus: true,
    searchTrainsArray: [] as ITrain [],
    searchWord: "",

};

export const createTrain = createAsyncThunk(
    'trainSlice/createTrain',
    async (train: ITrain) => {
        try {
            const {data, status} = await trainsService.createTrain(train);
            return {trains: data, status, error: undefined};
        } catch (e) {
            return {trainData: undefined, status: 401, error: `${e}`};
        }
    }
)

export const getAllTrains = createAsyncThunk(
    'trainSlice/getAll',
    async () => {
        try {
            const {data, status} = await trainsService.getTrains();

            return {trains: data, status, error: undefined};
        } catch (e) {
            return {trainData: undefined, status: 401, error: `${e}`};
        }
    },
);

export const getTrainsByName = createAsyncThunk(
    'trainSlice/getTrainsByName',
    async (search: string, {dispatch}) => {
        try {
            const {data} = await trainsService.getTrains();
            dispatch(setSearchTrainsArray({data, search}))
        } catch (e) {
            return {trainData: undefined, status: 401, error: `${e}`};
        }
    }
)

export const getTrainsByCity = createAsyncThunk(
    'trainSlice/getByCity',
    async (city: string) => {
        try {
            const {data, status} = await trainsService.getTrainsByRoute(city);

            return {trains: data, status, error: undefined};
        } catch (e) {
            return {trainData: undefined, status: 401, error: `${e}`};
        }
    },
);

export const getTrainById = createAsyncThunk(
    'trainSlice/trainById',
    async (id: string) => {
        try {
            const {data, status} = await trainsService.getTrainById(id);

            return {trains: data, status, error: undefined};
        } catch (e) {
            return {trainData: undefined, status: 401, error: `${e}`};
        }
    }
)

export const updateTrain = createAsyncThunk(
    'trainSlice/update',
    async (dataToUpdate: IUpdate) => {
        try {
            const {data, status} = await trainsService.updateTrain(dataToUpdate.id, dataToUpdate.data);

            return {trains: data, status, error: undefined};
        } catch (e) {
            return {trainData: undefined, status: 401, error: `${e}`};
        }
    }
)

export const deleteTrainById = createAsyncThunk(
    'trainSlice/deleteTrain',
    async (id: string) => {
        try {
            const {data, status} = await trainsService.deleteTrain(id);

            return {trains: data, status, error: undefined};
        } catch (e) {
            return {trainData: undefined, status: 401, error: `${e}`};
        }
    }
)


const trainSlice = createSlice({
    name: "trainSlice",
    initialState,
    reducers: {
        setSearchTrainsArray: (state, action: { payload: { data: ITrain[], search: string } }) => {
            let result = action.payload.data.filter(value => value.name?.toLowerCase().includes(action.payload.search.toLowerCase()));
            if (result.length) {
                state.searchTrainsArray = result;
                state.searchStatus = false;
            }
            state.searchWord = action.payload.search;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTrain.fulfilled, () => {
            console.log("Train created....")
        })
        builder.addCase(getAllTrains.pending, () => {
        });
        builder.addCase(getAllTrains.fulfilled, (state, action) => {
            if (action.payload.trains) {
                state.trains = action.payload.trains;
            }
        });
        builder.addCase(getTrainsByCity.fulfilled, (state, action) => {
            if (action.payload.trains) {
                state.rule = false;
                state.trainsByName = action.payload.trains;
            }
        });

        builder.addCase(getTrainById.fulfilled, (state, action) => {
            if (action.payload.trains) {
                state.train = action.payload.trains;
            }
        });
        builder.addCase(updateTrain.fulfilled, () => {
            console.log("Train updated....")
        });
        builder.addCase(deleteTrainById.fulfilled, () => {
            console.log("Train deleted....")
        })
    }
});
const trainReducer = trainSlice.reducer;
export {trainReducer};
export const {setSearchTrainsArray} = trainSlice.actions;
