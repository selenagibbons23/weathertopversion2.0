import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { conversions } from "../utils/conversions.js";

const db = initStore("readings");

export const readingStore = {
  async getAllReadings() {
    await db.read();
    return db.data.readings;
  },

  async addReading(stationId, reading) {
    await db.read();
    reading._id = v4();
    reading.stationid = stationId;
    db.data.readings.push(reading);
    await db.write();
    return reading;
  },

  async getReadingsByStationId(id) {
    await db.read();
    return db.data.readings.filter((reading) => reading.stationid === id);
  },

  async getReadingById(id) {
    await db.read();
    return db.data.readings.find((reading) => reading._id === id);
  },

  async deleteReading(id) {
    await db.read();
    const index = db.data.readings.findIndex((reading) => reading._id === id);
    db.data.readings.splice(index, 1);
    await db.write();
  },

  async deleteAllReadings() {
    db.data.readings = [];
    await db.write();
  },

  async updateReading(readingId, updatedReading) {
    const reading = await this.getReadingById(readingId);
    reading.code = updatedReading.code;
    reading.temp = updatedReading.temp;
    reading.windSpeed = updatedReading.windSpeed;
    reading.windDirection = updatedReading.windDirection;
    reading.pressure = updatedReading.pressure;
    reading.fahrenheit = updatedReading.fahrenheit;
    reading.beaufortScale = updatedReading.beaufortScale;
    reading.windDirectionCalculation = updatedReading.WindDirectionCalculation;

    await db.write();
  },
};
