const router = require('koa-router')()
const koaBody = require('koa-body')()

//Importing controller
const ResolutionController = require('./../controllers/resolution-controller')

//Calling respective controllers for routes
router.get('/api/resolutions', ResolutionController.get)
router.post('/api/resolutions', ResolutionController.post)
router.put('/api/resolutions/:id', ResolutionController.put)
router.delete('/api/resolutions/:id', ResolutionController.delete) 

module.exports = router