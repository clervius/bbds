var path = require('path');
	rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/bigbodies',
		rootPath: rootPath,
		port: process.env.PORT || 8888,
		where: 'development - local',
		secrets: {
			session: 'bigbodies-development'
			},
		userRoles: ['user', 'admin'],
		keys: {
			access: process.env.access,
			secret: process.env.secret,
			bucket: process.env.bucket,
			region: process.env.region
			}
	},
	production: {
		db: 'mongodb://clervius:JcVrm431@ds042379.mlab.com:42379/bigbodies',
		rootPath: rootPath,
		port: process.env.PORT || 80,
		where: 'production - mlab',
		secrets: {
			session: 'bigbodies-production'
			},
		userRoles: ['user', 'admin'],
		keys: {
			access: process.env.access,
			secret: process.env.secret,
			bucket: process.env.bucket,
			region: process.env.region
			}
	}
}