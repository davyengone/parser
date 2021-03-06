var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();

parser.addListener('end', function(result) {
    console.dir(result);
    console.log('Done.');
});

parser.addListener('error', function(error) {
    
    console.log('error parsing the file: ', error);
});

fs.readFile(__dirname + '/books.xml', function(err, data) {
    parser.parseString(data);
});