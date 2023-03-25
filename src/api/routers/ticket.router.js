const router = require('express').Router()
const authenticate = require('../../middlewares/authenticate')
const role = require('../../middlewares/manageRoles')
const queryHandler = require('../../middlewares/queryHandler')
const ctrl = require('../controllers/ticket.controller')


router.get('/', authenticate, role('admin-valid-user'), queryHandler('ticket'), ctrl.getTickets)

router.get('/:id', authenticate, role('admin-valid-user'), queryHandler('ticket'), ctrl.getTicket)

router.post('/', authenticate, role('valid-user'), ctrl.createTicket)

router.get('/:id/:type', authenticate, role('valid-user'), ctrl.generate)

router.delete('/:id', authenticate, role('admin-valid-user'), ctrl.deleteTicket)


module.exports = router