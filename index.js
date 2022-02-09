import app from "./config/express-conf.mjs";

app.listen(3001, () => {
    console.log("API Server started and listening on port 3000");
});

export default app;
