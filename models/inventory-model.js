const pool = require('../database/')

async function getClassifications() {
    const { rows } = await pool.query('SELECT classification_id id, classification_name name FROM public.classification ORDER BY classification_name')
    return rows
}

async function getInventoryByClassificationId(classification_id) {
    try {
        const { rows } = await pool.query(
            `SELECT inv_id id, inv_make make, inv_model model, inv_thumbnail thumbnail, inv_price price, classification_name FROM public.inventory i JOIN public.classification c ON i.classification_id = c.classification_id WHERE i.classification_id = $1`,
            [classification_id]
        )

        return rows
    } catch (error) {
        console.error(`getclassificationsbyid error ${error}`)
    }
}

module.exports = {
    getClassifications,
    getInventoryByClassificationId
}