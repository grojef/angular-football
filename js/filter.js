var filters = angular.module('filters',[]);

filters.filter('reserveType',function(){
	return function(input,param1){
		if(input){
		var statements = '';
		switch(Number(input)){
			case 23:
				statements='主胜';
				break;
			case 21:
				statements='主平';
				break;
			case 20:
				statements='主负';
				break;
			case 13:
				statements='让'+param1+'胜';
				break;
			case 11:
				statements='让'+param1+'平';
				break;
			case 10:
				statements='让'+param1+'负';
				break;				
			default:
				statements='';
				break;
		}
		return statements;

		}
	}
});