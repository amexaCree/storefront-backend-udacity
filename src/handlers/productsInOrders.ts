import express, { Request, Response } from 'express'

import { DashboardQueries } from '../services/dashboard'

const dashboardRoutes = (app: express.Application) => {
    app.get('/products_in_orders', productsInOrders)
}

const dashboard = new DashboardQueries()

const productsInOrders = async (_req: Request, res: Response) => {
    try {
        const products = await dashboard.productsInOrders()
        res.json(products)
    } catch (err) {
        res.status(400)
        res.json({"error": `${err}`})
    }
}

export default dashboardRoutes