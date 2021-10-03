import express, { Request, Response } from 'express'
import { Express, RequestHandler } from 'express';
import productsRoute from './handlers/products';
import usersRoute from './handlers/users';
import ordersRoute from './handlers/orders';
import dashboardRoutes from './handlers/dashboard';

const app: Express = express()
const address: string = "0.0.0.0:3000"

app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello Shopping World!')
})

productsRoute(app)
usersRoute(app)
ordersRoute(app)
dashboardRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app