import { Request as IReq, Response as IRes } from 'express';

export const upload = async (req: IReq, res: IRes) => {
  res.json("http://localhost:3000/uploads/" + req.file?.filename)
}