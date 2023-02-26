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
 
