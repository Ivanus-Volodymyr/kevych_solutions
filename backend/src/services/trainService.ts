import { DeleteResult, UpdateResult } from "typeorm";

import { ITrain } from "../interfaces";
import { trainRepository } from "../repositories/train/trainRepository";

class TrainService {
  public async createTrain(train: ITrain): Promise<ITrain> {
    return trainRepository.createTrain(train);
  }

  public async getTrains(): Promise<ITrain[] | undefined> {
    return trainRepository.getTrains();
  }

  public async getTrainById(id: number): Promise<ITrain | undefined> {
    return trainRepository.getTrainById(id);
  }

  public async updateTrainById(
    id: number,
    train: Partial<ITrain>
  ): Promise<UpdateResult | undefined> {
    return trainRepository.updateTrain(id, train);
  }

  public async deleteTrainById(id: number): Promise<DeleteResult> {
    return trainRepository.deleteTrain(id);
  }

  public async getTrainByCityRoute(
    city: string
  ): Promise<ITrain[] | undefined> {
    const trains = await trainRepository.getTrains();
    return trains?.filter((value) =>
      value.route
        .toLowerCase()
        .split("-")
        .find((influence) => influence.includes(city.toLowerCase()))
    );
  }
}

export const trainService = new TrainService();
