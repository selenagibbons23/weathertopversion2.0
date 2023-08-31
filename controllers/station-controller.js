import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { conversions } from "../utils/conversions.js";
import { stationAnalytics } from "../utils/station-analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const latestReading = await stationAnalytics.getLatestReading(station);
   const latestTemp = stationAnalytics.getLatestTemp(station);
   const latestWindSpeed = stationAnalytics.getLatestWindSpeed(station);
    const latestWindDirection = stationAnalytics.getLatestWindDirection(station);
    const viewData = {
      station: "Station",
      station: station,
      latestReading: latestReading,
      //fahrenheit: conversions.tempConversion(request.body.temp),
     // beaufortScale: conversions.beaufortScaleConversion(request.body.windSpeed),
      //windChill: stationAnalytics.getWindChill(request.body.temp,request.body.windSpeed),
      //windCompass: conversions.degreesToCompass(request.body.windDirection),
    };

    let viewDataString = JSON.stringify(viewData); // Debug Remove Later
    let viewDateObject = JSON.parse(viewDataString); // Debug Remove Later
    console.dir(viewDateObject, { depth: null, colors: true }); // Debug Remove Later

    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      fahrenheit: conversions.tempConversion(request.body.temp),
      beaufortScale: conversions.beaufortScaleConversion(request.body.windSpeed),
      windChill: stationAnalytics.getWindChill(request.body.temp,request.body.windSpeed),
      windCompass: conversions.degreesToCompass(request.body.windDirection),
    };
    console.log(`adding reading ${newReading.code}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },

  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReading(request.params.readingId);
    response.redirect("/station/" + stationId);
  },
};
