const sequelize = require('../models')
const db = sequelize.models

const asyncHandler = require('../../utils/asyncErrorHandler')
const AppRes = require('../../utils/AppRes')
const AppErr = require('../../utils/AppErr')


const getBleachers = asyncHandler(async (req, res) => {
	let result
	let option = req.option 
	
	// if count query is present
	if (req.count) {
		result = await db.bleacher.findOne(option)
	} else {
		result = await db.bleacher.findAll(option)
	}
	
	res.send(AppRes(200, 'data fetched', result))
})


const getBleacher = asyncHandler(async (req, res) => {
	const option = req.option
	option.where = {type : req.params.type}
	const result = await db.bleacher.findOne(option)
	
	// if no bleacher found send error msg
	if (!result) throw new AppErr(404, req.params.type + ' bleacher not found', 'bleacherType')
	
	res.send(AppRes(200, 'data fetched', result))
})


const createBleacher = asyncHandler(async (req, res) => {
	const bleacher = {...req.body}
	
	// FIXME
	// check the bleacher params before updating it
	
	const result = await db.bleacher.create(bleacher)
	
	res.status(201).send(AppRes(201, 'bleacher created', result))
})


const updateBleacher = asyncHandler(async (req, res) => {
	const bleacher = req.body
	
	// FIXME
	// check the bleacher params before updating it
	
	let result = await db.bleacher.findOne({
		where : {type : req.params.type},
	})
	
	if (!result) throw new AppErr(404, 'No bleacher with type of '+req.params.type, 'bleacherType')
	
	result.update(bleacher)
	
	// for some reason the type is not changing
	result.dataValues.type = bleacher.type
	result.save()
	
	res.send(AppRes(200, 'bleacher updated', result))
})


const deleteBleacher = asyncHandler(async (req, res) => {
	const result = await db.bleacher.findOne({
		where : {type : req.params.type},
	})
	
	if (!result) throw new AppErr(404, 'No bleacher with type of '+req.params.type, 'bleacherType')
	
	result.destroy()
	
	res.send(AppRes(200, 'bleacher deleted', {infected :result}))
})

module.exports = {
	getBleachers,
	getBleacher,
	createBleacher,
	updateBleacher,
	deleteBleacher,
}