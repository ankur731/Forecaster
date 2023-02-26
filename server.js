const express = require("express");
const http=require("http");
const https = require("https");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 4000;

const app = express();
app.set("view-engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

let Recentcity =["Delhi",23, "Mumbai",33, "Chennai",35, "Kolkata",38];
app.set('views', __dirname + '/views');

var facts = ['Sandstorms can swallow up entire cities',
             'Dirt mixed with wind can make dust storms called black blizzards',
              'The coldest temperature ever officially recorded was -89.2°C. Brrrr!', 
              'Mild autumn weather often means bigger spiders in our homes.', 
              'About 2,000 thunderstorms rain down on Earth every minute',
              'A heatwave can make train tracks bend!',
            'A mudslide can carry rocks, trees, vehicles and entire buildings!',
          'You can tell the temperature by counting a cricket’s chirps!',
        'A 2003 heatwave turned grapes to raisins before they were picked from the vine!',
      'Lightning often follows a volcanic eruption.',
    'Raindrops can be the size of a housefly and fall at more than 30kmph.',
  'Cape Farewell in Greenland is the windiest place on the planet.',
'Hurricanes can push more than 6m of water ashore.',
'In July 2001 the rainfall in Kerala, India, was blood red!',
'Cats and dogs have been known to sense when a tornado is approaching.',
'The wind doesn’t make a sound until it blows against an object.',
'Average global temperature is up 0.94°C (1.7°F) since 1880.',
'For each minute of the day, 1 billion tonnes of rain falls on the Earth.',
'A molecule of water will stay in the Earth’s atmosphere for an average duration of 10-12 days',
'Every second around 100 lightning bolts strike the Earth.',
'The fastest speed a falling raindrop can hit you is 18 mph.',
'It was so cold in 1684 that the Thames River in England froze solid for two months.',
'Mawsynram in Meghalaya, India is the wettest place on Earth with an annual rainfall of more than 11 meters.',
'Highest Temperature Recorded on Earth is 56.7°C (134°F) at Greenland Ranch in Death Valley, California, on July 10, 1913.',
'Lowest Temperature Recorded on Earth is -89.2°C (-128.5°F) at Vostok, Antarctica on July 21, 1983.',
'A cubic mile of ordinary fog contains less than a gallon of water.'];

var today = new Date();
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

    var dateOfDay1 = today.toLocaleDateString("en-US", {month:"long", year:"numeric" })
    var dateOfDay2 = today.toLocaleString("en-US", options);

app.get("/", function(req, res){
  res.render("index.ejs", {cityId:"Na",date1: dateOfDay1, date2: dateOfDay2, weatherHumidity:"N/A",  weatherTemperature:Recentcity[1], location:"Delhi, In", windSpeed: "N/A", visibilityValue:"N/A", pressureValue:"N/A",weatherDescription: "Haze", city1:Recentcity[0], temp1: Recentcity[1], city2:Recentcity[2],temp2:Recentcity[3],city3:Recentcity[4], temp3: Recentcity[5], city4:Recentcity[6],temp4:Recentcity[7],sunrise:"00:00 AM", sunset:"00:00 PM",weatherView : "haze",textVisibility:"hidden",time:"00:00Am"
} );
  
  
  } )
  app.post("/", function(req, res){
    const apikey = "e50b281ddb0687a70755f947e6782ea7";
    var cityName = req.body.city;
    var unit = "metric";
   
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units="+unit+"&appid="+apikey;
   
      
    https.get(url,function(response){
      if(response.statusCode==200)
      {
          response.on("data", function(data){
          const weatherData = JSON.parse(data);
          const temperature = weatherData.main.temp;
        
         
          const visi = weatherData.visibility;
          const desc = weatherData.weather[0].description;
          const speedOfWind = weatherData.wind.speed;
          const pressValue = weatherData.main.pressure;
          const country = weatherData.sys.country;
          const humid = weatherData.main.humidity;
          const minimumTemp = weatherData.main.temp_min;
          const maximumTemp = weatherData.main.temp_max;
          const icon = weatherData.weather[0].icon;
          const id = weatherData.id;
          const view = weatherData.weather[0].main;
    
          const dt = weatherData.dt;
          const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
          cityName = weatherData.name;
          const loc = cityName+", "+country;
          const srTime = weatherData.sys.sunrise;
          const ssTime = weatherData.sys.sunset;
          var sunriseTime = new Date(srTime * 1000);
          var sunsetTime = new Date(ssTime * 1000);
          sunriseTime.setHours(sunriseTime.getHours + 5);
          sunriseTime.setMinutes(sunriseTime.getMinutes + 30);
          sunsetTime.setHours(sunsetTime.getHours + 5);
          sunsetTime.setMinutes(sunsetTime.getMinutes + 30);
          sunriseTime =  sunriseTime.toLocaleTimeString();
          sunsetTime = sunsetTime.toLocaleTimeString();
          var weatherTime = new Date(dt*1000)
          weatherTime.setHours(weatherTime.getHours()+5);
          weatherTime.setMinutes(weatherTime.getMinutes()+30);
          weatherTime = weatherTime.toLocaleTimeString();
          
          cityName =loc;
          if(Recentcity[0]!=cityName)
          {
            Recentcity.unshift(temperature);
            Recentcity.unshift(loc);
            
            Recentcity.pop();
            Recentcity.pop();
         }
          
          res.render("index.ejs", { location:loc, date1: dateOfDay1, date2:dateOfDay2,  weatherTemperature:temperature, windSpeed: speedOfWind,weatherDescription:desc, visibilityValue:visi, pressureValue:pressValue,weatherHumidity:humid, city1: Recentcity[0],city2: Recentcity[2],city3: Recentcity[4],city4: Recentcity[6],
            temp1: Recentcity[1],temp2: Recentcity[3],temp3: Recentcity[5],temp4:Recentcity[7], 
            sunrise:sunriseTime, sunset:sunsetTime, minTemp:minimumTemp, maxTemp:maximumTemp, cityId:id, weatherView : view ,textVisibility: "hidden",time:weatherTime})
            
            
          })
        }
        else
        {
          res.render("index.ejs", {date1: dateOfDay1, date2:dateOfDay2,weatherHumidity:"N/A",  weatherTemperature:"N/A", location:"Invalid", windSpeed: "N/A", visibilityValue:"N/A", pressureValue:"N/A",weatherDescription: "N/A", city1: Recentcity[0],city2: Recentcity[2],city3: Recentcity[4],city4: Recentcity[6],
          temp1: Recentcity[1],temp2: Recentcity[3],temp3: Recentcity[5],temp4:Recentcity[7], 
          sunrise:"00:00 AM", sunset:"00:00 PM" ,cityId:"Na", weatherView : "Unknown",textVisibility: "visible",time:"00:00 Am" })
          
        }
      })    
    })
    
    app.get("/feedback", function(req, res){
      res.render("feedback.ejs");
    })
    
    app.post("/feedback", function(req, res){
      let transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: "10ef8bb8293209",
          pass: "3a7d4a4f871c52"
        }
})

message = {
   from: req.body.email,
   to: "ankur37tiwari@email.com",
   subject:  " weather Feedback from - " + req.body.name,
   text: req.body.message
}
transporter.sendMail(message, function(err, info) {
   if (err) {
     console.log(err)
   }
})
res.redirect("/");
    })
   
     


      
    
    app.get("/facts", function(req, res){
      res.render("facts.ejs", {facts:facts})
    })
    app.get("/map", function(req, res){
      res.render("map.ejs", {facts:facts})
    })
    app.get("/pollution", function(req, res){
      res.render("pollution.ejs", {pm2_5 :"140", pm10 :"156" ,o3:"881",no2:"11",condition: "Very Poor", Aqi:"5" ,date1:dateOfDay1, date2:dateOfDay2, location:"Delhi, India",city1:RecentPollutionCity[0],city2:RecentPollutionCity[3],city3:RecentPollutionCity[6],city4:RecentPollutionCity[9],aqi1:RecentPollutionCity[1],aqi2:RecentPollutionCity[4],aqi3:RecentPollutionCity[7],aqi4:RecentPollutionCity[10],condition1:RecentPollutionCity[2], condition2:RecentPollutionCity[5], condition3:RecentPollutionCity[8], condition4:RecentPollutionCity[11] ,time:"00:00 Pm"})
    })

    
    var  RecentPollutionCity =["Delhi",5,"Very Poor", "Mumbai",4,"Poor", "Chennai",4,"Poor", "Kolkata",3,"Moderate"];
   
 app.post("/pollution", function(req, res){
      
      const geoApiKey="62a2051a67ce3892fc82ff6be015feac"
      const apikey = "e50b281ddb0687a70755f947e6782ea7";
      var cityName = req.body.city;
      const gurl="http://api.positionstack.com/v1/forward?access_key="+geoApiKey+"&query="+cityName;
      
      http.get(gurl, function(response){
        if(response.statusCode==200)
        {
          const chunks1 = [];
          response.on("data", function(chunk1){
            chunks1.push(chunk1);
          });
          response.on("end", function(chunk1){
            const body1 = Buffer.concat(chunks1);
          const locationData = JSON.parse(body1);
          var lat = locationData.data[0].latitude;
          var lon = locationData.data[0].longitude;
          cityName = locationData.data[0].label;
          const purl = "http://api.openweathermap.org/data/2.5/air_pollution?lat="+lat+"&lon="+lon+"&appid="+apikey;

          http.get(purl,function(response){
            const chunks2 = [];
            response.on("data", function(chunk2){
              chunks2.push(chunk2);
            });
            if(response.statusCode==200)
            {
              response.on("end", function(data){
                const body = Buffer.concat(chunks2);
                const pollutionData = JSON.parse(body);
                const pollutionCo = pollutionData.list[0].components.co;
                // const pollutionNo = pollutionData.list[0].components.no;
                const pollutionNo = pollutionData.list[0].components.no2;
                const pollutionPm2_5 = pollutionData.list[0].components.pm2_5;
                const pollutionAqi = pollutionData.list[0].main.aqi
                const pollutionPm10 = pollutionData.list[0].components.pm10;
                const dt = pollutionData.list[0].dt;
                const pollutionTime = new Date().toLocaleTimeString();
                
               

                if(pollutionAqi==1)
                {
                  var pollutionCondition="Good";
                }
                else if(pollutionAqi==2)
                {
                  var pollutionCondition="Fair";
                }
                else if(pollutionAqi==3)
                {
                  var pollutionCondition="Moderate";
                }
                
                else if(pollutionAqi==4)
               {
                 var pollutionCondition="Poor";
             
               }
                else
                {
                  var pollutionCondition="Very Poor";
                }

                if(RecentPollutionCity[0]!=cityName)
                {
                 RecentPollutionCity.unshift(pollutionCondition);
                 RecentPollutionCity.unshift(pollutionAqi);
                 RecentPollutionCity.unshift(cityName);
            
                 RecentPollutionCity.pop();
                 RecentPollutionCity.pop();
                 RecentPollutionCity.pop();
                }
             
                res.render("pollution.ejs", {pm2_5 :pollutionPm2_5, pm10 : pollutionPm10 ,o3:pollutionCo,no2:pollutionNo, condition: pollutionCondition, Aqi:pollutionAqi ,date1:"", date2:"",location:cityName,
                date1:dateOfDay1,date2:dateOfDay1,time:pollutionTime,city1:RecentPollutionCity[0],city2:RecentPollutionCity[3],city3:RecentPollutionCity[6],city4:RecentPollutionCity[9],aqi1:RecentPollutionCity[1],aqi2:RecentPollutionCity[4],aqi3:RecentPollutionCity[7],aqi4:RecentPollutionCity[10],condition1:RecentPollutionCity[2], condition2:RecentPollutionCity[5], condition3:RecentPollutionCity[8], condition4:RecentPollutionCity[11] })
              })
            }
            else
            {
              res.render("pollution.ejs", {pm2_5 :"", pm10 : "" ,o3:"",no2:"", condition: "",condition1: "",condition2: "",condition3: "",condition4: "", Aqi:"" ,date1:"", date2:"",location:"Invalid",time:"",aqi1:"",city1:"",aqi2:"",city2:"",aqi3:"",city3:"",aqi4:"",city4:"" })

              
            }
          })    
        })    
      }
      else{
        res.redirect("/");
        // res.render("pollution.ejs", {pm2_5 :"", pm10 : "" ,o3:"",no2:"", condition: "",condition1: "",condition2: "",condition3: "",condition4: "", Aqi:"" ,date1:dateOfDay1, date2:dateOfDay2,location:"Invalid",time:"",aqi1:"",city1:"",aqi2:"",city2:"",aqi3:"",city3:"",aqi4:"",city4:"" })
      }
     
        
      // }
      })
    })  
app.listen(PORT, function(req, res){
    console.log("Server is running on port 5000");
})