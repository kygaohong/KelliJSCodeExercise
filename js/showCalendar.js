$(document).ready(function(){
    $("form").submit(function(){
		event.preventDefault();
		//get parameters
		var StartDate = $("input#StartDate").val();
		var NumberOfdays = $("input#NumberOfdays").val();
		var CountryCode = $("input#CountryCode").val();

		
		var dayNames = ['S','M','T','W','T','F','S'];
		var monthNames = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
		
		//Starting date
		var objStartingDate = new Date(StartDate);
		objStartingDate.setDate(objStartingDate.getDate() + 1);//otherwise get yesterday 
		var StartingDate = objStartingDate.getDate();
		var StartingDay = objStartingDate.getDay();
		//Ending date
		var objEndingDate = new Date(objStartingDate.getTime()+(NumberOfdays*24*60*60*1000));
		console.log("Starting date is " + objStartingDate);
		console.log("Ending date is " + objEndingDate);


		//monthly calendar
		var html = "";
		var objCurrentDate = objStartingDate;
		
		do {	// each month
			currentMonth = monthNames[objCurrentDate.getMonth()]+ ", "+objCurrentDate.getFullYear();
			html = html + '<div class="monthly-day-title-wrap"><div>'+dayNames[0]+'</div><div>'+dayNames[1]+'</div><div>'+dayNames[2]+'</div><div>'+dayNames[3]+'</div><div>'+dayNames[4]+'</div><div>'+dayNames[5]+'</div><div>'+dayNames[6]+'</div></div><div class="monthly-day-wrap"></div>';
			html = html + '<div class = "month-year-title-wrap">' + currentMonth + '</div>';
			html = html + '<div class="monthly-day-wrap">';
			
			
			var StartingDay = objCurrentDate.getDay();	//the first week of the month
			for (i = 0; i < StartingDay; i++) {			//insert blank cell before the first day
				html = html + '<div>' + ' '+ '</div>';
			}
			for (i = StartingDay; i < 7; i++) {
					html = html + '<div>'+ objCurrentDate.getDate() +'</div>';
					objCurrentDate.setDate(objCurrentDate.getDate() + 1);
				}
			html = html +'</div>';		//end of a week	
			
			var lastDayOfMonth = new Date(objCurrentDate.getFullYear(), objCurrentDate.getMonth() + 1, 0);
			if (lastDayOfMonth.getTime()>objEndingDate.getTime()){ //the last month
				lastDayOfMonth =objEndingDate;
			}
			console.log("last date of the month "+ currentMonth +" is " + lastDayOfMonth);

			do{		//each week
				html = html + '<div class="monthly-day-wrap">';
				for (i = 0; i < 7; i++) { //each day
					if(objCurrentDate.getTime() > lastDayOfMonth.getTime()+68400000){	//objCurrentDate is 19:00 but lastDayOfMonth is 0:00
						//console.log(objCurrentDate + "   >  "+ lastDayOfMonth);
						html = html + '<div>' + ' '+ '</div>'; 			//insert blank cell after the last day
					} else{
						html = html + '<div>'+  objCurrentDate.getDate() +'</div>';
						objCurrentDate.setDate(objCurrentDate.getDate() + 1);
						//console.log(objCurrentDate + "   <=  "+ lastDayOfMonth);
					}
				}
				html = html +'</div>';		//end of a week		
			} while (objCurrentDate.getTime() < lastDayOfMonth.getTime()+68400000);
			
			html = html +'</div><br><br>';	//end of a month			
		} while (objCurrentDate.getTime() < objEndingDate.getTime()+68400000);
					
		$("#mycalendar").append(html);		//write the string into html
    });

});


