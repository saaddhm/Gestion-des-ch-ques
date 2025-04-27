import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import checksRouter from "./api/checks"; 
import loginRoute from "./api/login";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/checks", checksRouter);
app.use("/api", loginRoute);
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      console.error("Unhandled error:", err);
    });

    const port = 5000;

    // Setup Vite or serve static depending on environment
    if (app.get("env") === "development") {
      await setupVite(app);
    } else {
      serveStatic(app);
    }

    // Correct way to start server in Express
    app.listen(port, () => {
      log(`Server is running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Fatal error starting server:", error);
    process.exit(1);
  }
})();