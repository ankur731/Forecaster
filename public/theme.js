
let body = document.getElementById('body')


window.addEventListener("load", function(){
  {
    console.log("loaded");
      var themeValue = localStorage.getItem("theme");
      if(themeValue==="dark")
      {
        body.classList.add('dark-mode')
      }
      else if(themeValue==="light")
      {
        body.classList.remove('dark-mode');
      } 
    }
})
window.addEventListener("load", function(){
  var ctx = document.getElementById('chart').getContext('2d');
  window.myGauge = new Chart(ctx, config);
})

function change_theme()
{
  // document.getElementById("mode").addEventListener('click',()=>{
   
      if(body.classList.contains('dark-mode'))
      {
        body.classList.remove('dark-mode')
        document.getElementById("theme-mode").classList.add("fa-sun");
        document.getElementById("theme-mode").classList.remove("fa-moon");
         localStorage.setItem("theme", "light");
      }
      else
      {
       body.classList.add('dark-mode');
       document.getElementById("theme-mode").classList.add("fa-moon");
       document.getElementById("theme-mode").classList.remove("fa-sun");
       localStorage.setItem("theme", "dark");
      //  navbar_theme()
      }   
  // }) \
  document.getElementById('navbar').classList.toggle('bg-dark');
  document.getElementById('navbar').classList.toggle('navbar-dark');
  
}


function navbar_theme()
{
  document.getElementById('navbar').classList.toggle('bg-dark');
  document.getElementById('navbar').classList.toggle('navbar-dark');
  document.body.classList.toggle('dark-mode');
  if(body.classList.contains('dark-mode'))
  {
    // body.classList.remove('dark-mode')
    
    document.getElementById("theme-mode2").classList.add("fa-moon");
   document.getElementById("theme-mode2").classList.remove("fa-sun");
    localStorage.setItem("theme", "light");
  }
  else
  {
  //  body.classList.add('dark-mode');
  document.getElementById("theme-mode2").classList.add("fa-sun");
  document.getElementById("theme-mode2").classList.remove("fa-moon");
   localStorage.setItem("theme", "dark");
  }   
}