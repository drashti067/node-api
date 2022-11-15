const ObjectId = require('mongoose').Types.ObjectId;

const validateID = (id) => {
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

module.exports = validateID;