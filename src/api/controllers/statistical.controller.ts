import { Request, Response, NextFunction } from "express";
import { StatisticalService } from "../services/statistical/statistical.service";

class StatisticalController {
  private readonly statisticalService: StatisticalService;

  constructor(statisticalService: StatisticalService) {
    this.statisticalService = statisticalService;
  }

  async simpleStatistical(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const simpleStatistical = await this.statisticalService.simpleStatistical();

    if (!simpleStatistical.data) return next(simpleStatistical);

    return res.status(simpleStatistical.status).json(simpleStatistical.data);
  }
}

export const statisticalController = new StatisticalController(
  new StatisticalService()
);
