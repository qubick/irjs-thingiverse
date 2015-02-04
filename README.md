# Command Line

$ thing pumpkin

	pumpkin1.stl
	pumpkin2.stl
	pumpkin3.stl


# API

	var thing = require('./irjs-thingiverse')


	thing.getThings(startThing#, endThing#)
	thing.searchbyTerm('searchTerm')
	thing.searchbyUser('userId')
	thing.createThing('thingName')
	thing.addFilestoThing('.stl filename')
	thing.updateProfileImage

# Examples

# Future Plan

	thing.openAtMakerBot('thing#')
