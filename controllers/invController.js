const { getInventoryByClassificationId } = require('../models/inventory-model')
const utilities = require('../utilities/')

const invCont = {}

invCont.buildByClassificationId = async (req, res, next) => {
    const classification_id = req.params.classificationId
    const data = await getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)

    const nav = await utilities.getNav()

    const className = data[0].classification_name

    res.render("./inventory/classification", {
        title: `${className} vehicles`,
        nav,
        grid
    })
}

module.exports = invCont