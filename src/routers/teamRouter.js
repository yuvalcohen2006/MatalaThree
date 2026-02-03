const express = require("express")
const Team = require("../models/team")
const router = new express.Router()

router.post('/teams', async (req, res) => {
    const team = new Team(req.body)

    try {
        await team.save()
        res.status(201).send(team)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find({});
        res.send(teams)
    } catch (e) { res.status(500).send(e) }
})

router.get('/teams/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const team = await Team.findById(_id)
        if (!team) return res.status(400).send()
        res.send(team)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/teams/name/:name', async (req, res) => {
    const _teamName = req.params.name
    try {
        const team = await Team.findOne({ name: _teamName });
        res.send(team.leader)
    } catch (e) { res.status(500).send(e) }
})

router.get('/teams/size/:name', async (req, res) => {
    const _teamName = req.params.name
    try {
        const team = await Team.findOne({ name: _teamName });
        res.send(team.size)
    } catch (e) { res.status(500).send(e) }
})

router.patch('teams/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "leader", "size", "description"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send("Invalid update")
    const _id = req.params.id
    try {
        const team = await Team.findByIdAndUpdate(_id, req.body, { new: true })

        if (!team) return res.status(404).send()

        res.send(team)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.delete('teams/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const team = await Team.findByIdAndDelete(_id)

        if (!team) return res.status(404).send()

        res.send(team)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router