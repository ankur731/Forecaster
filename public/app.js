function sendEmail(){
    Email.send({
Host : "smtp.elasticemail.com",
Username : "ankur73tiwari@gmail.com",
Password : "476C25C3150F9DC4AD89F43B0E068F3F3003",
To : 'ankur37tiwari@gmail.com',
From : "ankur73tiwari@gmail.com",
Subject : "New form submission",
Body : "Name: "+ document.getElementById("name").value + "<br>Email: " + document.getElementById("email").value + "<br>Message: " + document.getElementById("msg").value
}).then(
);
showSubmitMsg();
}
function file_attachment(){
    alert("Sorry file attachment is not working currently");
}
function showSubmitMsg(){
    document.querySelector(".submit-msg").style.display="block";
    setTimeout(hideSubmitMsg, 3000)
}
function hideSubmitMsg(){
    document.querySelector(".submit-msg").style.display="none";

 }
 

  var config = {
    type: 'gauge',
    data: {
      labels: ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'],
      datasets: [{
        data: data,
        value: value,
        backgroundColor: ['green', 'yellow', 'orange', 'red','#AF0000'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Pollution chart'
      },
      layout: {
        padding: {
          bottom: 30
        },
        
      },
      needle: {
        // Needle circle radius as the percentage of the chart area width
        radiusPercentage: 2,
        // Needle width as the percentage of the chart area width
        widthPercentage: 3.2,
        // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
        lengthPercentage: 75,
        // The color of the needle
        color: 'rgba(0, 0, 0, 1)'
      },
     
      valueLabel: {
        formatter: Math.round,
      },
      
    }
  };
  
  
  

