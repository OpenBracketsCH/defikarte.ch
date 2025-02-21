import axios from "axios";

export const requestAedData = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "https://defikarte-backend-staging.azurewebsites.net/api/defibrillator",
      {
        method: "GET",
        headers: {
          "ACCESS-Control-Allow-Origin": "*",
        },
      }
    );
    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (error) {
    console.error(error);
  }

  return [];
};
