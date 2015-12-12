/**
 * http://usejsdoc.org/
 */
var fs = require('fs');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;


var path = '/media/neshant/part1/Data/data/Stock_Data_Files/Historical_Stock_Prices';
var collection_name='historicData4';
var location_of_mongo_server='mongodb://localhost:27017/stocks';

var files = fs.readdirSync(path);
/*for (var i in files) 
{
	
	  console.log('Model Loaded: ' + files[i]);
	  
	 
}*/
var count_files =0;


var endFunction = function(){
	console.log("All done!");
};

var insertHead = function(){
if(count_files<files.length)
	{conditioner(files[count_files],path);count_files++;}
else
	{endFunction();}
};



var insertToMongo = function(url_param,value,callback)
{
	MongoClient.connect(url_param,function(err,db)
	{
		if(err)
		{
			console.log("unable to connect with the database err:"+err);
		}
		else
		{
			console.log("connected to mongodb ");
			var collection = db.collection(collection_name).initializeUnorderedBulkOp();
			for(var i=0;i<value.length;i++)
			{
				//console.log(value[i]);
				collection.insert(value[i]);
			}
			collection.execute(function (err, result) {
				console.log("Operation complete");
				   db.close();
				   callback();
				});
			//var collection = db.collection();
			/*collection.insert(value,function(err,result)
			{
				if(err)
				{console.log("some error occoured"+err);}
				else
				{console.log("insert succeeded");}
				db.close();
				callback();
			});		*/
		}
	});

};

var conditioner = function(fileName, primaryPath){
	var count=0,initial=[],result=[],result_arr=[],max_length=0;
	var name = fileName.split('.');
	var rl = require('readline').createInterface({ 
		input: require('fs').createReadStream(primaryPath+"/"+fileName) 
	});
	rl.on('line', function (line) {
		if(count===0){initial=line.split(',');count++;}
		else{
			var record = line.split(',');
			
			max_length = record.length;
			if(record.length>initial.length){max_length = initial.lenght;}
			
			var result = "{"+"\"Company\""+":\""+name[0]+"\",";
			for(var i =0; i<max_length-1;i++){	result = result +"\""+initial[i]+"\":\""+ String(record[i])+"\",";		}
			result = result+"\""+initial[max_length-1]+"\""+":\""+String(record[max_length-1])+"\"}";
			
			var obj = JSON.parse(result);
			result_arr.push(obj);
		}
	  
	});
	rl.on('close',function(){
		console.log(result_arr);
		insertToMongo(location_of_mongo_server,result_arr,insertHead);
		return result_arr;});
};

insertHead();






//console.log(conditioner("AA.csv","/media/neshant/part1/Data/data/Stock_Data_Files/Historical_Stock_Prices"));
