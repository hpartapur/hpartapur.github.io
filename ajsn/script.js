function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

function modalDelay(){
    $(document).ready(function(){
        setTimeout(function(){
            $('#myModal').modal('show');
        }, 1200);
    });
}

function cookietotable(){
    var group = getCookie("group");
    //search json for correct group json

    //create html table from json and adds to page
    convertJsonToBootstrapTable(); //NEEDS PARAMETER OF JSON, AND PARAMETER OF TABLE ID




}
 
function convertJsonToBootstrapTable(json,id){
    //Get the headers from JSON data
    var headers = Object.keys(json[0]);
     
    //Prepare html header
    var headerRowHTML='<tr>';
    for(var i=0;i<headers.length;i++){
        headerRowHTML+='<th>'+headers[i]+'</th>';
    }
    headerRowHTML+='</tr>';       
     
    //Prepare all the employee records as HTML
    var allRecordsHTML='';
    for(var i=0;i<json.length;i++){
     
        //Prepare html row
        allRecordsHTML+='<tr>';
        for(var j=0;j<headers.length;j++){
            var header=headers[j];
            allRecordsHTML+='<td>'+json[i][header]+'</td>';
        }
        allRecordsHTML+='</tr>';
         
    }
     
    //Append the table header and all records
    var table=document.getElementById(id);
    table.innerHTML=headerRowHTML + allRecordsHTML;
}