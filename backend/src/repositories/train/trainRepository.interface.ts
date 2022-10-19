import {ITrain} from "../../interfaces";
import {DeleteResult, UpdateResult} from "typeorm";

export interface ITrainRepository{
    createTrain(train: ITrain): Promise<ITrain>;
    getTrains(): Promise<ITrain[] | undefined>;
    getTrainById(id: number): Promise<ITrain | undefined>;
    updateTrain(id: number, train: Partial<ITrain>): Promise<UpdateResult>;
    deleteTrain(id: number): Promise<DeleteResult>;
}
