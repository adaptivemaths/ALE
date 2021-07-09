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
  console.log(process.env.DEPLOY_ENV);
  if (process.env.DEPLOY_ENV === "production") {
    return prod
  }
  if (process.env.DEPLOY_ENV === "development") {
    return dev
  }
  return local
}

export const config = getConfig();


export const axiosConfig = {
  headers: { "Access-Control-Allow-Origin": "*" },
};

