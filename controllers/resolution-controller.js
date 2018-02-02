module.exports = (() => {

    const Resolution = require('../models/resolution')

    return {
        //Find all entries
        async getAll(ctx) {
            let result = await Resolution.find({})
            ctx.body = result
        },

        //Find one entries
        async getOne(ctx) {
            let result = await Resolution.findOne({ _id: ctx.params.id })
            if (!result) {
                ctx.body = {
                    success: false
                }
                return
            }
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
            let result = await Resolution.findOne({ _id: ctx.params.id })
            if (!result) {
                ctx.body = {
                    success: false
                }
                return
            }

            for (var param in ctx.request.body) {
                result[param] = ctx.request.body[param]
            }

            await result.save()
            ctx.body = result
        },

        //Delete existing entry
        async delete(ctx) {
            let result = await Resolution.findOne({ _id: ctx.params.id })
            if (!result) {
                ctx.body = {
                    success: false
                }
                return
            }

            ctx.body = await result.remove()
        }
    }

})();