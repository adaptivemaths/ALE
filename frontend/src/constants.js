const prod = {
  API_URL: "https://adaptive-maths.herokuapp.com/"
};

const dev = {
  API_URL: "https://adaptive-maths-dev.herokuapp.com/"
};

const local = {
  API_URL: "http://localhost:5000"
}

function getConfig() {
  if (process.env.DEPLOY_ENV === "production") {
    return prod
  }
  if (process.env.DEPLOY_ENV === "development") {
    return dev
  }
  return local
}

export const config = getConfig();