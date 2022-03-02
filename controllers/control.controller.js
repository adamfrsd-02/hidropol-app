const db = require('../model/')
const Control = db.control

exports.findAll = (req, res) => {
    Control.find()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Something's Wrong !"
            })
        })
}

exports.create = (req, res) => {
    const controlData = new Control({
        device: req.body.device,
        data: req.body.data
    })

    controlData.save(controlData)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(409).send({
                messages: err.message || "Can't Save Data !"
            })
        })

}

exports.findOne = (req, res) => {
    const id = req.params.id

    Control.findById(id)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Error finding data !"
            })
        })
}


exports.update = (req, res) => {
    const id = req.params.id

    Control.findByIdAndUpdate(id, req.body)
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    messages: "Not Found !"
                })
            }
            res.send({
                messages: "Updated Successfully !"
            })
        }).catch((err) => {
            res.status(409).send({
                messages: err.message || "Failed to update !"
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Control.findByIdAndRemove(id)
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    message: "Not Found !"
                })
            }
            res.send({
                message: "Sucessfully removed !"
            })
        }).catch((err) => {
            res.status(409).send({
                messages: err.message || "Failed to remove !"
            })
        })
}