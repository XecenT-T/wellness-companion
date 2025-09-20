const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

// DB connect helper (must export a function that returns a Promise)
const connectDB = require("./config/mongodb");

const apiRouter = require("./routes/routes");     // your user routes
const meowRouter = require("./routes/meowroutes"); // meow/model routes

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON bodies

(async function start() {
  try {
    // 1) Connect to MongoDB before mounting routes that use models
    await connectDB();

    // 2) Mount API routers first (mount more specific routes before general ones)
    app.use("/api/meow", meowRouter);
    app.use("/api", apiRouter);

    // 3) Serve frontend: prefer production build only (do NOT fallback to frontend/index.html)
    const frontendRoot = path.join(__dirname, "..", "frontend");
    const frontendDist = path.join(frontendRoot, "dist"); // Vite default output
    const indexDist = path.join(frontendDist, "index.html");

    if (fs.existsSync(indexDist)) {
      app.use(express.static(frontendDist));
      const frontendRoutes = [
        "/",
        "/landing",
        "/home",
        "/login",
        "/journal",
        "/meow",
        "/dashboard",
        "/counselor",
      ];
      frontendRoutes.forEach((rt) => app.get(rt, (req, res) => res.sendFile(indexDist)));
      app.get("/journal/:id", (req, res) => res.sendFile(indexDist));

      // serve index.html for non-API GETs
      app.use((req, res, next) => {
        if (req.path.startsWith("/api/") || req.path === "/api") return next();
        if (req.method === "GET") return res.sendFile(indexDist);
        next();
      });
    } else {
      // production build missing — instruct developer instead of serving dev index
      app.get(
        ["/", "/home", "/login", "/journal", "/journal/:id", "/meow", "/dashboard", "/counselor"],
        (req, res) => {
          res.status(503).send(
            "Frontend production build not found. Run `npm run build` inside frontend/ then restart backend."
          );
        }
      );

      app.use((req, res) => {
        if (req.path.startsWith("/api/") || req.path === "/api") {
          return res.status(404).json({ error: "API route not found" });
        }
        res.status(404).send("Not found");
      });
    }

    // 4) Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();