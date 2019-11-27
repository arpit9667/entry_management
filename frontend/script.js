url = 'http://localhost:3000/getCurrent'

fetch(url).then(function(response) {
    return response.json();
}).then(function(data) {
    // console.log(data);
    if(data.length)
        listItem(data);
    else{
        myNode = document.createElement('div');
        myNode.innerHTML = `<h1>No Records Found!!<h1>`
        document.getElementById("sessions").appendChild(myNode);
    }
})

function listItem(data){
    for (var i = 0; i < data.length; i++){
        var list = data[i];
        myNode = document.createElement('div');
        myNode.id = 'a_session'
        dt = list.checkin.toString()
        
        myNode.innerHTML = `
        <legend><span class="number">${i+1}</span>CheckIn Details</legend>
        <div><h2>Host Details:</h1>
          <p>Name: ${list.host}</p>
          <p>Email: ${list.hmail}</p>
          <p>Phone: ${list.hphone}</p>
        <h2>Visitor Details:</h1>
          <p>Name: ${list.visitor}</p>
          <p>Email: ${list.vmail}</p>
          <p>Phone: ${list.vphone}</p>
          <p>CheckIn Time: <span id="datetime">${dt.slice(0,10)} ${dt.slice(11,19)}</span></p>
        </div>
<form action="/checkout" method="POST">
<button name="id" type="submit" value="${list._id}">Checkout</button>
</form>` 
        document.getElementById("sessions").appendChild(myNode);
    }  
}



