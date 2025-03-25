import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import routes from "./routes";
import * as fs from 'fs'; // For reading the JSON file
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
const PORT = process.env.PORT || 3000;

app.use(express.json());

const swaggerDocument = JSON.parse(fs.readFileSync('src/swagger-doc.json', 'utf8')); // read the swagger.json file.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
