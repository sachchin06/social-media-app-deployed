const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//Update User
router.put("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt =await  bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(403).json(error)
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })

            return res.status(200).json("Account Has been Updated")
        } catch (error) {
            return res.status(403).json(error)
        }
    } else {
        return res.status(403).json("you are not allowed to update")
    }
})
//Get a User

router.get("/", async (req,res)=> {

    const userId = req.query.userId
    const username = req.query.username

    try {
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({ username : username})
        
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        return res.status(500).json(error)
    }
})
//Follow a User
router.put("/:id/follow", async (req,res)=>{
    try {
        if(req.body.userId!==req.params.id){
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if(!user.followers.includes(currentUser._id)){
                await user.updateOne({$push: {followers: currentUser._id}})
                await currentUser.updateOne({$push: {following: user._id}})
                return res.status(200).json("user has been followed")
            } else {
                return res.status(500).json("you already follow this user")
            }
        } else {
            return res.status(500).json("you can not follow your self")
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Unfollow a User
router.put("/:id/unFollow", async (req,res)=>{
    try {
        if(req.body.userId!==req.params.id){
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if(user.followers.includes(currentUser._id)){
                await user.updateOne({$pull: {followers: currentUser._id}})
                await currentUser.updateOne({$pull: {following: user._id}})
                return res.status(200).json("user has been unfollowed")
            } else {
                return res.status(500).json("you can not unfollow this user")
            }
        } else {
            return res.status(500).json("you can not unfollow your self")
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Delete User

router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        
        try {
            await User.findByIdAndDelete(req.params.id)

            return res.status(200).json("Account Has been Deleted")
        } catch (error) {
            return res.status(403).json(error)
        }
    } else {
        return res.status(403).json("you are not allowed to delete")
    }
})

module.exports = router