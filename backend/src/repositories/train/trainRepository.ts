import {DeleteResult, EntityRepository, getManager, Repository, UpdateResult} from "typeorm";

import {Train} from "../../entity/train";
import {ITrain} from "../../interfaces";
import {ITrainRepository} from "./trainRepository.interface";

@EntityRepository(Train)
class TrainRepository extends Repository<Train> implements ITrainRepository{
    public async createTrain(train: ITrain): Promise<ITrain> {
        return getManager().getRepository(Train).save(train)
    }

    public async getTrains(): Promise<ITrain[] | undefined> {
        return getManager().getRepository(Train).find();
    }

    public async getTrainById(id: number): Promise<ITrain | undefined> {
        return getManager().getRepository(Train).findOne({id});
    }

    public async updateTrain(id: number, train: Partial<ITrain>): Promise<UpdateResult> {
        return getManager().getRepository(Train).update({id}, train);
    }

    public async deleteTrain(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Train).softDelete({id})
    }

}

export const trainRepository = new TrainRepository()

