const app= require("express")();

// Setup route
app.get("/", (req, res)=>{
    res.json("Welcome to Node.js Jenkins CI/CD!");
});


// Start server
const PORT= process.env.PORT || 5000;
app.listen(PORT, ()=> {`Server started on port ${PORT}`});