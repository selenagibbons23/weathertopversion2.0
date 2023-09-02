import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { stationAnalytics } from "../utils/station-analytics.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);

    //
    //    const latestReading = await stationAnalytics.getLatestReading(station);

    for (const station of stations) {
      const latestReading = await stationAnalytics.getLatestReadingForStation(
        station
      );
      station.latestReading = latestReading;
    }

    console.log(JSON.stringify(stations));
    // let viewDataString = JSON.stringify(stations); // Debug Remove Later
    //let viewDateObject = JSON.parse(viewDataString); // Debug Remove Later
    //console.dir(viewDateObject, { depth: null, colors: true }); // Debug Remove Later

    //sort list of stations in alphabetical order
    const sortedList = stations.sort((a, b) => a.name.localeCompare(b.name));

    const viewData = {
      title: "Station Dashboard",
      stations: stations, //sortedList,
      //loggedInUser: loggedInUser,
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      name: request.body.name.toUpperCase(),
      latitude: request.body.lat,
      longitude: request.body.lng,
      userid: loggedInUser._id,
    };
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
