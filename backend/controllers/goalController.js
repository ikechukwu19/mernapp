const asyncHandler = require('express-async-handler')
const { findById } = require('../models/goalModel')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc get goals
// @route GET /api/goals
// access Private
const getGoals = asyncHandler (async (req, res) => {
    const goals = await Goal.find({ user: req.user.id})
    res.json(goals)
})

// @desc set goals
// @route POST /api/goals
// access Private
const setGoals = asyncHandler (async (req, res) => {
    if(!req.body.text) {
        res.status(404)
        throw new Error('Please add a text field')
    }
    const  goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.json(goal)
})

// @desc update goals
// @route PUT /api/goals/:id
// access Private
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    //make sure the logged in user matches
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedGoal)
})

// @desc delete goals
// @route DELETE /api/goals/:id
// access Private
const deleteGoals = asyncHandler(async (req, res) => {
    //const goal = await Goal.findByIdAndDelete(req.params.id)
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    //make sure the logged in user matches
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await goal.remove()
    res.json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}