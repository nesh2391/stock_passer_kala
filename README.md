

# CSV-Pareser
A simple CSV passer for the stocks data set

## Required settings 
var path = '/media/neshant/part1/Data/data/Stock_Data_Files/Historical_Stock_Prices';

var collection_name='historicData4';

var location_of_mongo_server='mongodb://localhost:27017/stocks';

##Expectations
It is expected that nodeJS and MongoDB are installed
It is also expected that a cuitable collection be created and data to pass available 

##Notes
Though this is intended to be a Passer fot the stocks CSV data, it could be compatible with any CSV data, It is prefered that the data is clean. Though it can handle some basic errors.
