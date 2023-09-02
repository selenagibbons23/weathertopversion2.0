export const conversions = {
  codeConversion(code) {
    if (code <= 100) {
      return "Clear";
    } else if (code <= 200) {
      return "Partial clouds";
    } else if (code <= 300) {
      return "Cloudy";
    } else if (code <= 400) {
      return "Light Showers";
    } else if (code <= 500) {
      return "Heavy Showers";
    } else if (code <= 600) {
      return "Rain";
    } else if (code <= 700) {
      return "Snow";
    } else if (code <= 800) {
      return "Thunder";
    } else {
      return "No Code";
    }
  },

  tempConversion(temp) {
    let fahrenheit = 0;
    if (temp != null) {
      fahrenheit = temp * 1.8 + 32;
      return fahrenheit;
    } else return null;
  },

  beaufortScaleConversion(windSpeed) {
    if (windSpeed != null) {
      if (windSpeed == 0) {
        return 0;
      } else if (windSpeed >= 1 && windSpeed <= 6) {
        return 1;
      } else if (windSpeed >= 7 && windSpeed <= 11) {
        return 2;
      } else if (windSpeed >= 12 && windSpeed <= 19) {
        return 3;
      } else if (windSpeed >= 20 && windSpeed <= 29) {
        return 4;
      } else if (windSpeed >= 30 && windSpeed <= 39) {
        return 5;
      } else if (windSpeed >= 40 && windSpeed <= 50) {
        return 6;
      } else if (windSpeed >= 51 && windSpeed <= 62) {
        return 7;
      } else if (windSpeed >= 63 && windSpeed <= 75) {
        return 8;
      } else if (windSpeed >= 76 && windSpeed <= 87) {
        return 9;
      } else if (windSpeed >= 88 && windSpeed <= 102) {
        return 10;
      } else if (windSpeed >= 103 && windSpeed <= 117) {
        return 11;
      } else if (windSpeed >= 117) {
        return 12;
      }
      return -1;
    } else return null;
  },

  degreesToCompass(deg) {
    if (deg != null) {
      if (deg > 11.25 && deg <= 33.75) {
        return "North North East";
      } else if (deg > 33.75 && deg <= 56.25) {
        return "East North East";
      } else if (deg > 56.25 && deg <= 78.75) {
        return "East";
      } else if (deg > 78.75 && deg <= 101.25) {
        return "East South East";
      } else if (deg > 101.25 && deg <= 123.75) {
        return "East South East";
      } else if (deg > 123.75 && deg <= 146.25) {
        return "South East";
      } else if (deg > 146.25 && deg <= 168.75) {
        return "South South East";
      } else if (deg > 168.75 && deg <= 191.25) {
        return "South";
      } else if (deg > 191.25 && deg <= 213.75) {
        return "South South West";
      } else if (deg > 213.75 && deg <= 236.25) {
        return "South West";
      } else if (deg > 236.25 && deg <= 258.75) {
        return "West South West";
      } else if (deg > 258.75 && deg <= 281.25) {
        return "West";
      } else if (deg > 281.25 && deg <= 303.75) {
        return "West North West";
      } else if (deg > 303.75 && deg <= 326.25) {
        return "North West";
      } else if (deg > 326.25 && deg <= 348.75) {
        return "North North West";
      } else {
        return "North";
      }
    } else return null;
  },

  windChill(temp, windspeed) {
    if (temp != null) {
      const windChill =
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(windspeed, 0.16) +
        0.3965 * temp * Math.pow(windspeed, 0.16);
      return windChill.toFixed(2);
    } else return null;
  },
};
