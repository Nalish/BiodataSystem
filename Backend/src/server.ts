// dotenv
//express instance
//load variables
//enable all important middleware
//create all routes
//load more middleware - eg error handlers
//start the server

import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from "cors"
import { notFound } from "./middlewares/errorMiddlewares"
import authRoutes from "./routes/authRoutes"
import { getUsers } from "./controllers/usersController"
import usersRoutes from "./routes/usersRoutes"
import baptismRoutes from "./routes/baptismRoutes"
import eucharistRoutes from "./routes/eucharistRoutes"
import confirmRoutes from "./routes/confirmRoutes"
import marriageRoutes from "./routes/marriageRoutes"

//1:configure the dotenv
dotenv.config()

//2:instance of express
const app = express()

//NEVER IN YOUR LIFE FORGET THIS
//3:middle wares
app.use(express.json()) // for parsing application/json3
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//Cookie parser middleware
app.use(cookieParser())


const allowedOrigins = ['http://localhost:5173', 'http://localhost:4200'];

//CORS middleware
app.use(cors({
    origin: 'http://localhost:4200',
    origin: "http://localhost:4200",
    methods: "GET, POST, PUT, DELETE",
    credentials: true //allows cookies and auth headers
}))



//4:create the routes
app.use("/api/users", usersRoutes )
app.use("/api/auth", authRoutes )
app.use("/api/baptism", baptismRoutes )
app.use("/api/eucharist", eucharistRoutes )
app.use("/api/confirmation", confirmRoutes )
app.use("/api/marriage", marriageRoutes )


app.get('/api/test', (req, res) => {
    res.json({ message: "Frontend successfully connected to backend!" });
  });


//5:middlewares after the routes
app.use(notFound)

  

// start the server

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`🚀🚀Server is running on port: ${port}`)
})

//SOC - separation of concerns

//1: create a folder called routes
//2: create a file called usersRoute.ts
//3: create a file called eventsRoute.ts

//4: create a folder called controllers
//5: create a file called userController.ts
//6: create a file called eventController.ts

//7: create a folder called db
//8: create a file called users.ts
//9: create a file called events.ts
//10: create a file called db.config.ts

//11: create a folder called middlewares
//12: create a file called asyncHandler.ts
//13: create a file called errorMiddlewares.ts
//14: create a file called authMiddlewares.ts
//15: create a file called auth.ts
//16: create a file called jwt.ts
//17: create a file called bcrypt.ts
//18: create a file called logger.ts
//19: create a file called validation.ts
//20: create a file called utils.ts
//21: create a file called email.ts
//22: create a file called sms.ts
//23: create a file called pushNotification.ts
//24: create a file called socket.ts
//25: create a file called cache.ts
//26: create a file called db.ts
//27: create a file called db.config.ts
//28: create a file called db.models.ts
//29: create a file called db.controllers.ts
//30: create a file called db.services.ts
//31: create a file called db.repositories.ts
//32: create a file called db.migrations.ts
//33: create a file called db.seeders.ts
//34: create a file called db.config.ts