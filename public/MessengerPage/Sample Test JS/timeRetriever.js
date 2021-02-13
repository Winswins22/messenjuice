function formatTime(hours, minutes){

    let AM_or_PM = "";

    if (hours > 12){
        AM_or_PM = "PM";
        hours = hours - 12;
    }
    else if (hours == 12){
        AM_or_PM = "PM";
    }
    else{
        AM_or_PM = "AM";
    }

    let formattedTime = hours + ":" + minutes + AM_or_PM;

    return formattedTime;

}

let time_output_box = document.getElementById("time");
let currentDate = new Date();

let currentTime = formatTime(currentDate.getHours(),  + currentDate.getMinutes());

console.log(currentTime);

time_output_box.innerHTML = time_output_box.innerHTML + currentTime;