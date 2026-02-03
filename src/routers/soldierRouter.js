const express = require("express")
const Soldier = require("../models/soldier")
const router = new express.Router()

router.post('/soldiers', async (req, res) => {
    const soldier = new Soldier(req.body)

    try {
        await soldier.save()
        res.status(201).send(soldier)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/soldiers', async (req, res) => {
    try {
        const soldiers = await Soldier.find({});
        res.send(soldiers)
    } catch (e) { res.status(500).send(e) }
})

router.get('/soldiers/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const soldier = await Soldier.findById(_id)
        if (!soldier) return res.status(400).send()
        res.send(soldier)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/soldier/name/:name', async (req, res) => {
    const _soldierName = req.params.name
    try {
        const soldier = await Soldier.findOne({name: _soldierName});
        res.send(soldier.team)
    } catch (e) { res.status(500).send(e) }

})

router.patch('soldiers/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "age", "team"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send("Invalid update")
    const _id = req.params.id
    try {
        const soldier = await Soldier.findByIdAndUpdate(_id, req.body, { new: true })

        if (!soldier) return res.status(404).send()

        res.send(soldier)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.delete('soldiers/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const soldier = await Soldier.findByIdAndDelete(_id)

        if (!soldier) return res.status(404).send()

        res.send(soldier)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router