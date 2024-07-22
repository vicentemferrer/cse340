const invModel = require('../models/inventory-model')

const Util = {}

Util.getNav = async (req, res, next) => {
    const data = await invModel.getClassifications()

    let list = '<ul>'

    list += '<li><a href="/" title="Home page">Home</a></li>'

    list += data.reduce((acc, { id, name }) => {
        acc += `<li><a href="/inv/type/${id}" title="See our inventory of ${name} vehicles">${name}</a></li>`
        return acc
    }, '')

    // data.forEach(({ id, name }) => {
    //     list += `<li><a href="/inv/type/${id} title="See our inventory of ${name} vehicles">${name}</a></li>`
    // })

    list += "</ul>"

    return list
}

Util.buildClassificationGrid = async (data) => {
    let grid
    if (data.length > 0) {
        grid = '<ul id="inv-display">'

        grid += data.reduce((acc, { id, make, model, thumbnail, price }) => {
            const makeAndModel = `${make} ${model}`

            acc += '<li>'
            acc += `<a href="../../inv/detail/${id}" title="View ${makeAndModel} details"><img src="${thumbnail}" alt="Image of ${makeAndModel} on CSE Motors" /></a>`
            acc += '<div class="namePrice">'
            acc += '<hr />'
            acc += `<h2><a href="../../inv/detail/${id}" title="View ${makeAndModel} details">${makeAndModel}</a></h2>`
            acc += `<span>$${new Intl.NumberFormat('en-US').format(price)}</span>`
            acc += '</div>'
            acc += '</li>'

            return acc
        }, '')

        // data.forEach(({ id, make, model, thumbnail, price }) => {
        //     const makeAndModel = `${make} ${model}`
        //     grid += '<li>'
        //     grid += `<a href="../../inv/detail/${id}" title="View ${makeAndModel} details"><img src="${thumbnail}" alt="Image of ${makeAndModel} on CSE Motors" /></a>`
        //     grid += '<div class="namePrice">'
        //     grid += '<hr />'
        //     grid += `<h2><a href="../../inv/detail/${id}" title="View ${makeAndModel} details">${makeAndModel}</a></h2>`
        //     grid += `<span>$${new Intl.NumberFormat('en-US').format(price)}</span>`
        //     grid += '</div>'
        //     grid += '</li>'
        // })

        grid += '</ul>'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util