const bioyImporter = require('./src/_data/bioy.js');

// Setting the true flag triggers a clean import
// Otherwise it will just import yesterday, today, and ~forever~ tomorrow
bioyImporter(true);
