const productValidator = (req) => {

    const validations = [];

    if(!req.body.name){
        validations.push('The name is required');
    }
    if(!req.body.description){
        validations.push('The description is required');
    }
    if(!req.body.price){
        validations.push('The price is required');
    }
    if(!req.body.quantity){
        validations.push('The quantity is required');
    }
    if(!req.file){
        validations.push('Someone image is required');
    }

    return validations;
}

exports = module.exports = productValidator;