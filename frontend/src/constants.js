const prod = {
  API_URL: "https://adaptivemaths.herokuapp.com"
};

const dev = {
  API_URL: "https://adaptivemaths-dev.herokuapp.com"
};

const local = {
  API_URL: "http://localhost:5000"
}

function getConfig() {
  if (process.env.REACT_APP_NODE_ENV === "production") {
    return prod
  }
  if (process.env.REACT_APP_NODE_ENV === "development") {
    return dev
  }
  return local
}

export const config = getConfig();


export const axiosConfig = {
  headers: { "Access-Control-Allow-Origin": "*" },
};

