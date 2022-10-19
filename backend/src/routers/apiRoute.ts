import { Router } from "express";

import { trainRouter } from "./trainRouter";

const router = Router();

router.use("/trains", trainRouter);

router.use("*", (err: any, _req: any, res: any, _next: any) => {
  console.log("____________________________");
  console.log(err.message);
  console.log("____________________________");

  res.status(err.status || 500).json({
    message: err.message,
    data: err.data,
  });
});

export const apiRouter = router;
