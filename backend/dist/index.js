import express from "express";
const app = express();
app.use(express.json());
app.use("/api/auth", (req, res) => { });
app.get("/", (req, res) => {
    res.send("welcome to home page of the websiteuu ");
});
app.get("/use", (req, res) => {
    res.send("jgcybdsquiygfcuygiuygiu  ");
});
app.listen(5000, () => console.log("Backend is running on http://localhost:5000"));
