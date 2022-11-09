import { Router } from "express";
import { challengeToJoinService } from "../services/challengeToJoinService";

challengeRouter.get("/", loginRequired, async (req, res) => {
  const holdUserId = req.currentUserId;
  const result = await challengeToJoinService.getChallenges();
  res.status(200).json({ result });
});

export { challengeRouter };
