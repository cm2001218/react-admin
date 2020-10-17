import ajax from "./ajax";

// const BASE = "http://localhost:5000";
const BASE = "";

export const reqLogin = (username, password) => ajax(BASE + "/login", { username, password }, "POST");

export const reqAddUser = (user) => ajax(BASE + "/manage/user/add", user, "POST");

// export const reqWether = () => {
//   var lat;
//   var long;

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       lat = position.coords.latitude;
//       long = position.coords.longitude;

//       var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long + "";
//       // var api = `https://api.darksky.net/forecast/f29f5e6f825425a730343d5a0e9050de/${lat},${long}`;

//       $.getJSON(api, function (res) {
//         var celsius = res.main.temp;
//         var farenheit = celsius * 1.8 + 32;
//         var location = res.name;

//         $(".weather-location").html(location);
//         $(".temp").html(Math.floor(celsius));
//         $(".weather-description").html(res.weather[0].description);
//         $(".weatherType").attr("id", res.weather[0].main);
//         $(".row2").on("click", function () {
//           if ($(".temp").html() == Math.floor(celsius)) {
//             $(".temp").html(Math.floor(farenheit));
//             $(".temp-type").html("°F");
//           } else {
//             $(".temp").html(Math.floor(celsius));
//             $(".temp-type").html("°C");
//           }
//         });

//         //SETTING UP THE ICON
//         var icons = new Skycons({
//           color: "white",
//         });

//         icons.set("Clear-day", Skycons.CLEAR_DAY);
//         icons.set("Clear-night", Skycons.CLEAR_NIGHT);
//         icons.set("Partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
//         icons.set("Partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
//         icons.set("Clouds", Skycons.CLOUDY);
//         icons.set("Rain", Skycons.RAIN);
//         icons.set("Sleet", Skycons.SLEET);
//         icons.set("Snow", Skycons.SNOW);
//         icons.set("Wind", Skycons.WIND);
//         icons.set("Fog", Skycons.FOG);
//         icons.play();
//       });
//     });
//   }
// };
