# Installation

	$ npm install irjs-thingiverse

# CLI

	$ thing search -w pumpkin

	thing#:12345 pumpkin spice latte
	thing#:23456 Makerbot pumpkin
	thing#:65432 Pumpkin holloween 
	...

	pumpkin spice latte.zip saved
	Makerbot Pumkin.zip saved
	Pumpkin holloween.zip saved
	...


	$ thing search -t robot

	thing#:12345 Hanbot
	thing#:98766 Pumpkinbot
	...


	$ thing search -u mowi

	thing#:23494 body lotion
	thing#:23847 soap
	...


	$ thing get -i 123456

	123456.stl saved


	$ thing get -r 123-456

	123 saved
	124 saved
	page 125 does not exist
	126 saved
	thing 127 is not 3D file (not .stl format)
	...


# API

	var thing = require('./irjs-thingiverse')

	thing.searchByWord(term)
	thing.searchByTag(tag1, tag2, ...)
	thing.searchByUser(username)

	thing.getFileiById(fileId)
	thing.getFilesFromTo(startId, endId)


	//thing.createThing(thingName)
	//thing.addFilestoThing('.stl filename', thingName)


# Test

	$ mocha

# Examples


