require("dotenv").config();
const app = require("./app");
const connectMongoDB = require("./utils/mongoConnection");

const PORT = process.env.PORT || 3000;
connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
