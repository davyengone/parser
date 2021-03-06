var fs = require('fs'),
	xml2js = require('xml2js'),
	Q = require('q'),
	readline = require('readLine');

var parser = new xml2js.Parser();
parser.addListener('end', function(result) {
    console.dir(result);
    console.log('Done.');
});


var token = {
	curve: '_CUR',
	calibration: '_CA',
	constant: '_C',
	map: '_MAP'
}

var actionToken = {
	curve: function(obj, element) {
		var values = $(element).parent().next().next().next().next();
		obj.xArray = [];
		obj.yArray = [];

		var rows =  $('table tr', $(values));
		rows.each(function(i, row){
			if(i%2 === 0){
				var columns = $('th', $(row));
				columns.each(function(i, column){
					obj.xArray.push($(column).text());
				});
			}else{
				var columns = $('td', $(row));
				columns.each(function(i, column){
					var value = $(column).text();

					if(value !== 'y' && value !== 'PHY'){
						obj.yArray.push(value);
					}
				});
			}
		});
		return obj;
	},
	calibration: function(obj, element) {
		var values = $(element).parent().next().next().next().next();
		obj.values = [];

		var rows =  $('table tr', $(values));
		rows.each(function(i, row){
			if(i%2 !== 0){
				var columns = $('td', $(row));

				columns.each(function(i, column){
					var value = $(column).text();

					if(value !== 'w' && value !== 'PHY'){
						obj.values.push(value);
					}
				});
			}
		});
		return obj;
	},
	constant: function(obj, element) {
		var values = $(element).parent().next();
		var row =  $('table tr', $(values))[1];
		var column = $('td', $(row))[2]
		obj.value = $(column).text().trim();
		return obj;
	},
	map: function(obj, element) {
		var values = $(element).parent().next().next().next().next();
		obj.xArray = [];
		obj.yArray = [];
		obj.mapArray = [];

		var rows =  $('table tr', $(values));
		rows.each(function(i, row){
			if(i === 0){
				var columns = $('th', $(row));
				columns.each(function(i, column){
					obj.xArray.push($(column).text());
				});
			}else{
				var columns = $('td', $(row));
				var yValue = $('th', $(row)).text();
				obj.yArray.push(yValue);
				columns.each(function(i, column){
					var value = $(column).text();

					if(i > 1){
						obj.mapArray.push(value);
					}
				});
			}
		});
		return obj;
	}
}

var writeToken = {
	curve: function(obj){
		
	},
	calibration: function(obj) {
		var format = obj.name + ' = [';
		obj.values.each(function(i, value){
			format += value + ',';
		});
		format += ']';

		fs.writeFile('message.m', format, function (err) {
		  if (err) throw err;
		  debugger;
		  console.log('It\'s saved!');
		});
	},
	constant: function(obj) {},
	map: function(obj){}
}

var parse = function(mapArray) {
	var filename = document.getElementById('file').value;
	var mapArray = [];
	var defer = Q.defer();

	fs.readFile(filename, 'utf-8', function(err, html) {
		
		var data = jQuery('h2 > a[name]', html);

		data.each(function(index, item){

			var obj = {
				name: $(item).attr('name')
			}

			if (obj.name.indexOf(token.calibration) > 0) {
				mapArray.push(actionToken['calibration'](obj, item));
				return;
			}

			if (obj.name.indexOf(token.curve) > 0) {
				mapArray.push(actionToken['curve'](obj, item));
				return;
			}

			if (obj.name.indexOf(token.constant) > 0) {
				mapArray.push(actionToken['constant'](obj, item));
				return;
			}


			if (obj.name.indexOf(token.map) > 0) {
				mapArray.push(actionToken['map'](obj, item));
				return;
			}
		});

		defer.resolve(mapArray);

		// mapArray.forEach(function(obj, i) {
		// 	debugger;
		// 	if (obj.name.indexOf(token.calibration) > 0) {
		// 		writeToken['calibration'](obj);
		// 		return;
		// 	}

		// 	// if (obj.name.indexOf(token.curve) > 0) {
		// 	// 	mapArray.push(actionToken['curve'](obj, item));
		// 	// 	return;
		// 	// }

		// 	// if (obj.name.indexOf(token.constant) > 0) {
		// 	// 	mapArray.push(actionToken['constant'](obj, item));
		// 	// 	return;
		// 	// }


		// 	// if (obj.name.indexOf(token.map) > 0) {
		// 	// 	mapArray.push(actionToken['map'](obj, item));
		// 	// 	return;
		// 	// }
		// });
	});
	
	return defer.promise;
}

