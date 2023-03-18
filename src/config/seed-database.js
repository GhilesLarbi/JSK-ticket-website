const dotenv = require('dotenv')
dotenv.config({path : __dirname + '/../../.env'})

const sequelize = require('../api/models');
const db = sequelize.models

const bleachers = [
	{
		type : 'VIP',
		price : 2000,
		quantity : 300,
	},
	
	{
		type : 'ET',
		price : 300,
		quantity : 5000,
	},
	
	{
		type : 'EB',
		price : 500,
		quantity : 3000,
	},
	
	{
		type : 'NT',
		price : 400,
		quantity : 12000,
	},
	
	{
		type : 'NB',
		price : 600,
		quantity : 9000,
	},
	
	{
		type : 'WT',
		price : 300,
		quantity : 5000,
	},
	
	{
		type : 'WB',
		price : 500,
		quantity : 3000,
	},
]

const users = [
	{
		firstname : 'ghiles',
		lastname : 'larbi',
		password : '123',
		email : 'hinrobalas@gmail.com',
		isEmailConfirmed : true,
		phone : '0667667067',
		nationalNumber : '663882997629',
	},
	
	{
		firstname : 'nacer',
		lastname : 'laribi',
		password : '1234',
		email : 'nacer@gmail.com',
		isEmailConfirmed : false,
		phone : '0736382693',
		nationalNumber : '663882997674',
	},
	
	{
		firstname : 'ania',
		lastname : 'larbi',
		password : '12345',
		email : 'ania@gmail.com',
		isEmailConfirmed : false,
		phone : '0538297442',
		nationalNumber : '663882988379',
	},
	
	{
		firstname : 'karim',
		lastname : 'khelfaoui',
		password : '123456',
		email : 'karim@gmail.com',
		isEmailConfirmed : true,
		phone : '0732720761',
		nationalNumber : '663882937382',
	},
]

const games = [
	{
		date : new Date('2023-11-9'),
		description : 'semi-final',
		leagueId : 1,
		team1Id : 1,
		team2Id : 2,
		score : null,
	},
	
	{
		date : new Date('2023-9-15'),
		description : 'final',
		leagueId : 1,
		team1Id : 1,
		team2Id : 3,
		score : null,
	},
	
	{
		date : new Date('2023-2-22'),
		description : 'demi-final',
		leagueId : 2,
		team1Id : 1,
		team2Id : 4,
		score : '5-1',
	},
	
	{
		date : new Date('2023-2-3'),
		leagueId : 3,
		team1Id : 1,
		team2Id : 2,
		score : '3-0',
	},
]

const teams = [
	{
		name : 'JSK',
		logo : '/images/team/jsk.png',
	},
	
	{
		name : 'USMA',
		logo : '/images/team/usma.png',
	},
	
	{
		name : 'CRB',
		logo : '/images/team/crb.png',
	},
	
	{
		name : 'MCA',
		logo : '/images/team/mca.png',
	},
]

const leagues = [
	{
		name : 'CAN',
		logo : '/images/league/can.png',
	},
	
	{
		name : 'CAF',
		logo : '/images/league/caf.jpg',
	},
	
	{
		name : 'CLA',
		logo : '/images/league/cla.png',
	},
]

// check connection
async function assertDatabaseConnectionOk() {
	console.log('(!) Checking database connection ...');
	try {
		await sequelize.authenticate();
		console.log('(+) Database connection OK!');
	} catch (error) {
		console.log('(-) Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}



// create tables
async function createTables(config) {
	await assertDatabaseConnectionOk()
	try {
		await sequelize.sync(config)
		console.log('(+) Tables created');
		
		await db.user.bulkCreate(users, {validate : true, individualHooks: true})
		console.log('(+) Done seeding User table')
		
		await db.bleacher.bulkCreate(bleachers, {validate : true, individualHooks: true})
		console.log('(+) Done seeding Bleacher table')
		
		await db.team.bulkCreate(teams, {validate : true, individualHooks: true})
		console.log('(+) Done seeding Team table')
		
		await db.league.bulkCreate(leagues, {validate : true, individualHooks: true})
		console.log('(+) Done seeding League table')
		
		await db.game.bulkCreate(games, {validate : true, individualHooks: true})
		console.log('(+) Done seeding Game table')
		
		
		/*
		const test = await db.game.findAll({
			include: [
				{
					model: db.team,
					as: 'team1',
				},
				
				{
					model: db.team,
					as: 'team2',
				},
			],
		})
		
		test.forEach(game => {
			console.log(game.toJSON())
		})
		*/
		
		
		process.exit(0)
		
	} catch (err) {
		console.log('(-) somthing went wrong')
		console.log(err)
		process.exit(1)
	}
}
createTables({force : true})


