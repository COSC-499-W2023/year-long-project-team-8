import { GOOGLE_API_KEY } from "@env";

const reverseGeocode = async (latitude, longitude) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("reverse geocode data", data);

    if (data.status === "OK" && data.results.length > 0) {
      let city = "";
      let country = "";

      // Loop through the address components to find the city and country
      for (const component of data.results[0].address_components) {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("country")) {
          country = component.long_name;
        }
      }

      // Return the city and country, separated by a comma
      return city && country ? `${city}, ${country}` : "Location Not Available";
    } else {
      throw new Error("No results found for the given coordinates");
    }
  } catch (error) {
    console.error("Error in reverse geocoding:", error.message || error);
    return null;
  }
};

export default reverseGeocode;
