module.exports = (() => {

    const Resolution = require('../models/resolution')

    return {
        //Find all entries
        async get(ctx) {
            let result = await Resolution.find({})
            ctx.body = result
        },

        //Create new entry
        async post(ctx) {
            console.log('This is the request body content')
            console.log(ctx.request.body)
            let result = await Resolution.create(ctx.request.body)
            ctx.body = result
        },

        //Update existing entry
        async put(ctx) {
            var resolution = await Resolution.findOne({ _id: ctx.params.id })
            if (!resolution) {
                ctx.body = {
                    success: false
                }
                return
            }

            for (var param in ctx.request.body) {
                resolution[param] = ctx.request.body[param]
            }

            await resoltion.save()
            ctx.body = result
        },

        //Delete existing entry
        async delete(ctx) {
            var resolution = await Resolution.findOne({ _id: ctx.params.id })
            if (!resolution) {
                ctx.body = {
                    success: false
                }
                return
            }

            ctx.body = await resolution.remove()
        }
    }

})();