require('dotenv').config()

import { AppDataSource } from "./data-source"
import  express  from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express"
import YAML from "yaml"
import fs from "fs"

// import { User } from "./entity/User"
import authRouter from './routes/auth.routes'
import refreshTokenRouter from './routes/refreshToken.routes'
import userRouter from './routes/user.routes'
import path from "path"

const file  = fs.readFileSync(path.resolve('documentation.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)

AppDataSource.initialize().then(async () => {
    const app = express();
    
    const PORT = process.env.PORT || 4000;

    //Middleware
    app.use(cors({credentials: true}));
    app.use(express.json());
    app.use(cookieParser());

    //Routes
    app.use('/api/refresh_token', refreshTokenRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);

    //Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.listen(PORT, () => console.log(
		`SERVER STARTED ON PORT ${PORT}. GRAPHQL ENDPOINT ON http://localhost:${PORT}`
	));
}).catch(error => console.log(error))
