const invModel = require('../models/inventory-models')

const Util = {}

Util.getNav = async (req, res, next) => {
    const data = await invModel.getClassifications()

    let list = '<ul>'

    list += '<li><a href="/" title="Home page">Home</a></li>'

    data.rows.forEach((row) => {
        list += `<li><a href="/inv/type/${row.classification_id} title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a></li>`
    })

    list += "</ul>"

    return list
}

module.exports = Util