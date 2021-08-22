// Production frontend URL
const prod = {
  ORIGIN: "https://main.d2ujrjv31lp15s.amplifyapp.com",
};

// Development frontend URL
const dev = {
  ORIGIN: `https://dev.d2ujrjv31lp15s.amplifyapp.com`,
};
// Local frontned URL
const local = {
  ORIGIN: "http://localhost:3000",
};

function getConfig() {
  // Return origin URL based on environment type
  if (process.env.BE_NODE_ENV === "production") {
    return prod;
  } else if (process.env.BE_NODE_ENV === "development") {
    return dev;
  } else {
    return local;
  }
}

export const config = getConfig();
