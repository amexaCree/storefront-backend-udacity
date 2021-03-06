import { Express, Request, Response } from 'express';
import { User, PartialUser, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import util from '../util/helpers'
import auth from '../middleware/authorize'


const store = new UserStore()

const index = async (req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (err) {
        res.status(400)
        res.json({"error":`${err}`})
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const record = await store.show(req.params.id)
        const user: User = {
            id: record.id,
            first_name: record.first_name,
            last_name: record.last_name,
            username: record.username
        }
        res.json(user)
    } catch (err) {
        res.status(400)
        res.json({"error":`${err}`})
    }
}

const create = async (req: Request, res: Response) => {
    const user: PartialUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
    }
    if (util.isEmpty(user.username) || util.isEmpty(user.password)) {
        res.json("Invalid arguments. Requires username and password")
        return 
    }
    try {
        const newUser = await store.create(user)
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string);
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json({"error": `${err}`})
    }
}

const update = async (req: Request, res: Response) => {
    const user: PartialUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
    }
    const userRole = req.body.userRole
    console.log("userRole", userRole)

    try {
        if(userRole.id !== user.id) {
            throw new Error('User id does not match!')
        }
    } catch (err) {
        res.json(`${err}`)
        return
    }

    res.json("Update User!")

    // try {
    //     const edited = await store.update(req.params.id, user)
    //     res.json(edited)
    // } catch (err) {
    //     res.status(400)
    //     res.json(`error: ${err}`)
    // }
}

const destroy = async (req: Request, res: Response) => {

    try {
        const deleted = await store.delete(req.params.id)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(`Ivalid token. ${err}`)
    }
}
   

const login = async (req: Request, res: Response) =>  {
    try {
        const user = await store.authenticate(
            req.body.username, 
            req.body.password
        )
        if (user != null) {
            const token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string);
            res.json(token)
        } else {
            res.json(null)
        }
    } catch (err) {
        res.json({"error":`${err}`})
    }
}

const usersRoute = (app: Express) => {
    app.get('/users', auth, index)
    app.get('/users/:id', auth, show)
    app.put('/users/:id', auth, update)
    app.delete('/users/:id', auth, destroy)
    
    app.post('/users', create)
    app.post('/users/signup', create)
    app.post('users/login', login)
}


export default usersRoute