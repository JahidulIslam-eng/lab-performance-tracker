import express from "express";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Lab Performance Tracker Backend is running!");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
