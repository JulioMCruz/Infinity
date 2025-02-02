import {Request, Response, NextFunction} from "express";

export const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const defaultLimit = 1000;
  const defaultPage = 0;
  const defaultUpload = 1;
  const size = Math.max(parseInt(req.query.size as string) || defaultLimit);
  const page = Math.max(parseInt(req.query.page as string) || defaultPage);
  const skip = (page - 1) * size;
  const upload = Math.max(parseInt(req.query.upload as string) || defaultUpload);
  const start = req.query.start as unknown as Date | undefined;
  const end = req.query.end as unknown as Date | undefined;
  const previousPage = page > 1 ? page - 1 : null;
  const order = req.query.order as "asc" | "desc" | undefined;

  req.pagination = {
    skip,
    page: page <= 0 ? 1 : page,
    upload,
    size: size <= 0 ? defaultLimit : size,
    start,
    end,
    previousPage,
    order,
  };

  next();
};
