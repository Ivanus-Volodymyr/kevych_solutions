import {ITrain} from "./train.interface";

export interface IInitialState {
    trains: ITrain[];
    trainsByName: ITrain[];
    train: ITrain;
    cities: cityObj[];
    rule: boolean;
    searchStatus: boolean;
    searchTrainsArray: ITrain[],
    searchWord: string,
}

export interface cityObj {
    value: string;
    label: string;
}
