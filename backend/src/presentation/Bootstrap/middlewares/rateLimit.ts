import {rateLimit} from "express-rate-limit";
import {Request, Response, NextFunction} from "express";

export const limiterMiddleware = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 299,
  message: "Has excedido el número máximo de solicitudes. Por favor, intenta de nuevo más tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});

export const denyTerminalAgentsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.get("User-Agent") || "";
  const lowerUserAgent = userAgent.toLowerCase();
  const terminalAgents = [
    "curl",
    "wget",
    "powershell",
    "httpie",
    "python-requests",
    "go-http-client",
    "ruby",
    "java",
  ];

  if (terminalAgents.some((agent) => lowerUserAgent.includes(agent))) {
    return res.status(403).send("Las solicitudes desde terminales no están permitidas.");
  }

  next();
};
