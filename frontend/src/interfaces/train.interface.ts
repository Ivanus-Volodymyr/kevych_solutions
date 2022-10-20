export interface ITrain {
    id?: number;
    name?: string;
    description?: string;
    route?: string;
    arrival_time?: number;
    departure_time?: number;
}

export interface IUpdate {
    id: string;
    data: ITrain;
}
