const asyncHandler = require('express-async-handler')
// @desc get goals
// @route GET /api/goals
// access Private
const getGoals = asyncHandler (async (req, res) => {
    res.json({msg: 'get goal controller'})
})

// @desc set goals
// @route POST /api/goals
// access Private
const setGoals = asyncHandler (async (req, res) => {
    if(!req.body.text) {
        res.status(404)
        throw new Error('Please add a text field')
    }

    res.json({msg: 'set goal controller'})
})

// @desc update goals
// @route PUT /api/goals/:id
// access Private
const updateGoals = asyncHandler(async (req, res) => {
    res.json({msg: 'update goal controller'})
})

// @desc delete goals
// @route DELETE /api/goals/:id
// access Private
const deleteGoals = asyncHandler(async (req, res) => {
    res.json({msg: 'delete goal controller'})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}