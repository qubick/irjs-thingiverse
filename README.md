# Installation

	$ npm install -g irjs-thingiverse

# CLI

	$ thing search pumpkin

	pumpkin1.stl
	pumpkin2.stl
	pumpkin3.stl


# API

	var thing = require('./irjs-thingiverse')

	thing.getThings(startThing#, endThing#)
	thing.searchbyTerm(term1, term2, ...)
	thing.searchbyUser(username)
	thing.createThing(thingName)
	thing.addFilestoThing('.stl filename', thingName)

	thing.loginAccout(username, passwd)
	thing.updateProfileImage(img file)

	thing.openThing('thing#')

# Test

	$ mocha

# Examples


