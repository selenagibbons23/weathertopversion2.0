import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { conversions } from "../utils/conversions.js";
import { stationAnalytics } from "../utils/station-analytics.js";

export const readingController = {
  async index(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Editing Reading ${readingId} from Station ${stationId}`);
    const viewData = {
      name: "Edit Reading",
      station: await stationStore.getStationById(stationId),
      reading: await readingStore.getReadingById(readingId),
    };
    response.render("reading-view", viewData);
  },

  async update(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    const updatedReading = {
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`Updating Reading ${readingId} from Station ${stationId}`);
    const reading = await readingStore.getReadingById(readingId);
    await readingStore.updateReading(reading, updatedReading);
    response.redirect("/station/" + stationId);
  },
};
