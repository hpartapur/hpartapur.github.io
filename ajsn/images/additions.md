resources page
check whether page can provide pdfs


create day3,day4, day5 html pages

save to calendar functionality




add info to buildings.html
add multiple images for each builiding

update navbars



travel information plus sightseeing
create another webpage called travel.html for travel information and sightseeing
it should contain information for travelling from the JKIA airport to the Jamea campus
it should also contain information about sightseeing in Nairobi
example can be https://international-students.uark.edu/prearrival-and-orientation/prearrival/students/index.php

clicking logo on different days should take to different day pages

make newmodal pop up only once
use cookies

current day should blink https://www.geeksforgeeks.org/how-to-shake-an-image-using-css-keyframe/

asbaq venues tab

gallery

create csv with trnumbers and corresponding group
take input of trnumber and save corresponding group in cookie

create 12 table data htmls for each group and for each day

add images and text from edu email

// returns the cookie with the given name,
// or undefined if not found
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}