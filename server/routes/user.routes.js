import { Router } from "express"
import { protect } from "../middleware/authMiddleware.js"
import { deleteUser, getUser, getUsers, loginUser, logOutUser, registerUser, updateUser,updateHistory } from "../controllers/user.controller.js"
const userRouter = Router()

//routes
//Routes
//Returns a list of all users
userRouter.route('/all')
    .get( getUsers )
//:id
    //PATCH → updateHistory: Updates specific user history data.
    //DELETE → deleteUser: Deletes a user by their id.
    //PUT → updateUser: Fully updates a user’s information by id.
userRouter.route('/:id')
    .patch(updateHistory)
    .delete (deleteUser)
    .put(updateUser)
//GET → getUsers (protected by middleware protect): Retrieves users but only for authenticated requests.
userRouter.route('/')
    .get( protect, getUsers )
    .post( registerUser )
//
userRouter.route('/logins')
    .post (getUser)
//Authenticates a user and starts a session or returns a token.
userRouter.route('/login')
    .post( loginUser )
//logOutUser: Logs out the currently authenticated user, typically clearing session/token data.
userRouter.route('/logout')
    .post( logOutUser )

export default userRouter
