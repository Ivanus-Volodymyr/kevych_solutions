import { Request, Response } from "express";

import { trainService } from "../services";
import { ITrain } from "../interfaces";

class TrainController {
  public async createTrain(req: Request, res: Response) {
    const train = await trainService.createTrain(req.body);
    return res.json(train);
  }

  public async getTrains(
    req: Request,
    res: Response
  ): Promise<Response<ITrain[]>> {
    const queryObj = req?.query;
    const queryObjLength = Object.keys(queryObj).length;

    if (queryObjLength > 0) {
      const city = queryObj.city;
      if (typeof city === "string") {
        const trainsByCity = await trainService.getTrainByCityRoute(city);
        return res.json(trainsByCity);
      }
    }
    const trains = await trainService.getTrains();
    return res.json(trains);
  }

  public async getTrainById(
    req: Request,
    res: Response
  ): Promise<Response<ITrain> | undefined> {
    try {
      const id = Number(req?.params?.id);
      const trainById = await trainService.getTrainById(id);
      if (trainById) {
        return res.json(trainById);
      }
      throw new Error("No train with such id");
    } catch (e: any) {
      return res.status(404).json({
        message: e.message,
      });
    }
  }

  public async updateTrainById(
    req: Request,
    res: Response
  ): Promise<Response<ITrain | undefined>> {
    try {
      const id = Number(req?.params?.id);
      const trainById = await trainService.getTrainById(id);
      if (!trainById) {
        throw new Error("No train with such id");
      }
      const dataToUpdate = req?.body;
      const updatedTrain = await trainService.updateTrainById(id, dataToUpdate);

      return res.json(updatedTrain);
    } catch (e: any) {
      return res.status(404).json({
        message: e.message,
      });
    }
  }

  public async deleteTrainById(
    req: Request,
    res: Response
  ): Promise<Response<ITrain | undefined>> {
    try {
      const id = Number(req?.params?.id);
      const trainById = await trainService.getTrainById(id);
      if (!trainById) {
        throw new Error("No train with such id");
      }
      const deleteResult = await trainService.deleteTrainById(id);
      return res.json(deleteResult);
    } catch (e: any) {
      return res.status(404).json({
        message: e.message,
      });
    }
  }

  public async getTrainByCityRoute(_req: Request, res: Response) {
    try {
      // const trainByQuery = await trainService.getTrainByCityRoute("Lviv");
      // if (!trainByQuery) {
      //   throw new Error("No train with such City");
      // }
      // return res.json(trainByQuery);
    } catch (e: any) {
      return res.status(404).json({
        message: e.message,
      });
    }
  }
}

export const trainController = new TrainController();
