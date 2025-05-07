import User from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"


export const getUsers = async(req, res) => {
    try {
        const USERS = await User.find().select(`-password`)
        res.status(200).json(USERS)
    } catch (error){ res.status(400).json(error) }
}

export const loginUser = async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if( user && (await user.matchPassword(password)) ){
        const data = {
            _id : user._id,
            email : user.email,
        }
        generateToken(res, user._id)
        res.status(200).json(data)
    }
    else {res.status(401).json("User password or email is not valid.") }
}

export const registerUser = async(req, res) => {
    console.log("entered register controller. req.body:", req.body)
    try {
        const USER = await User.create(req.body)
        generateToken(res, USER._id)
        delete USER.password //removes password from the object
        res.status(201).json( USER )
    } catch (error){
        console.log("register controller error", error)
        res.status(400).json(error) }
}

export const logOutUser = async(req, res) => {
    res.cookie('jwt','', {httpOnly: true, expires: new Date(0)})
    res.status(200).json({message: 'Logged out successfully.'})
}


export const getUser = async (req, res) => {
    try {
    const userData = await User.findById(req.body._id).select("-password")
        if (!userData) {
            return res.status(404).json({ message: 'User data not found.' })
        }
    res.status(200).json(userData)
    } 
    catch (error) {
    res.status(400).json({ message: error.message || 'An error occurred while fetching the profile.' })
    }
}

export const updateUser = async (req, res) => {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const editedUser = await User.findByIdAndUpdate(
            req.body._id,
            req.body,
            options
        );
        res.status(200).json(editedUser);}
        catch( error ){ 
            res.status(400).json(error);
            throw error }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.body._id)
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' })
        }
        res.status(200).json(deletedUser)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// update history
export const updateHistory = async(req, res) => {
    const newPurchase = {_id: req.body._id, quantity: req.body.quantity, date: req.body.date}; 
    try {
        const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        // this resets the attribute purchases. For testing.
        // { $set: { purchases: [] } },
        //this adds to the array purchases:
        { $push: { purchases: newPurchase } },
        { new: true, runValidators: true }
        );
      if (!updatedUser) {
        console.log("user not found")
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(updatedUser);
    } catch (error) {
      console.error("controller error", error);
      return res.status(500).json({ error: 'Server error' });
    }
}
