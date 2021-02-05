async function getBusinessUserDoc(id) {
	try {
        const businessUser = require('../models/BusinessUser')
        let doc = await businessUser.findOne({ _id: id})//console.log(doc)
        return doc
    } catch (err) {
        console.log('err' + err)
        return true
    }
}

exports.getBusinessUserDoc = getBusinessUserDoc