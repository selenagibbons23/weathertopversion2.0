import { readingStore } from "../models/reading-store.js";
import { conversions } from "../utils/conversions.js";

export const stationAnalytics = {
  async getLatestReadingForStation(station) {
    let stationReadings = await readingStore.getReadingsByStationId(station._id);
    let latestReading = null;
    const reading = {
      code: null,
      temp: null,
      windSpeed: null,
      windDirection: null,
      pressure: null,
    };
    if (stationReadings.length > 0) {
      latestReading = stationReadings.length - 1;
      reading.code = stationReadings[latestReading].code;
      reading.temp = stationReadings[latestReading].temp;
      reading.windSpeed = stationReadings[latestReading].windSpeed;
      reading.windDirection = stationReadings[latestReading].windDirection;
      reading.pressure = stationReadings[latestReading].pressure;
      reading.fahrenheit = conversions.tempConversion(reading.temp),
      reading.beaufortScale = conversions.beaufortScaleConversion(reading.windSpeed),
      reading.windChill = stationAnalytics.getWindChill(reading.temp, reading.windSpeed),
      reading.windCompass = conversions.degreesToCompass(reading.windDirection)
    };

    return reading;
    
  },
  getLatestReading(station) {
    let latestReading = null;
    if (station.readings.length > 0) {
      for (let i = station.readings.length; i <= station.readings.length; i++) {
        {
          latestReading = station.readings[i - 1];
        }
      }
    }
    return latestReading;
  },

  getLatestTemp(station) {
    let latestTemp = null;
    if (station.readings.length > 0) {
      for (let i = station.readings.length; i <= station.readings.length; i++) {
        {
          latestTemp = station.readings[i - 1].temp;
        }
      }
    }
    return latestTemp;
  },

  getLatestWindSpeed(station) {
    let latestWindSpeed = null;
    if (station.readings.length > 0) {
      for (let i = station.readings.length; i <= station.readings.length; i++) {
        {
          latestWindSpeed = station.readings[i - 1].windSpeed;
        }
      }
    }
    return latestWindSpeed;
  },

  getLatestWindDirection(station) {
    let latestWindDirection = null;
    if (station.readings.length > 0) {
      for (let i = station.readings.length; i <= station.readings.length; i++) {
        {
          latestWindDirection = station.readings[i - 1].windDirection;
        }
      }
    }
    return latestWindDirection;
  },

  getWindChill(temp, windspeed) {
    console.log(`Calculating Wind Chill for ${temp} and ${windspeed}`);
    const windChill =
      Math.round(
        (13.12 + 0.6215 * temp - 11.37 * Math.pow(windspeed, 0.16) + 0.3965 * temp * Math.pow(windspeed, 0.16)) * 100.0
      ) / 100.0;
    return windChill.toFixed(2);
  },
};
