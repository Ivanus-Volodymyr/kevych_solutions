import { Router } from "express";

import { trainController } from "../controllers";

const router = Router();

router.post("/", trainController.createTrain);
router.get("/", trainController.getTrains);
router.get("/:id", trainController.getTrainById);
router.put("/:id", trainController.updateTrainById);
router.delete("/:id", trainController.deleteTrainById);

export const trainRouter = router;
