var models = ['./agenda.model', './contact.model', './user.model', './company.model'];

/**
 * Function to initialize all the models, based on an Array.
 */
exports.initialize = function() {
    models.forEach(function(model){
        require(model)();
    });
};