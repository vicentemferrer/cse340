const utilities = require("../utilities/")
const { index } = require("../data/route-settings")

const baseController = {}

baseController.buildHome = async (req, res) => {
    const nav = await utilities.getNav()
    res.render("index", { ...index, nav })
}

module.exports = baseController