  
const prod = {
    ORIGIN: "https://main.d2ujrjv31lp15s.amplifyapp.com",
  };
  
  const dev = {
    ORIGIN: `https://${process.env.AWS_BRANCH}.d2ujrjv31lp15s.amplifyapp.com`,
  };
  
  const local = {
    ORIGIN: "http://localhost:3000",
  };
  
  function getConfig() {
    if (process.env.BE_NODE_ENV === "production") {
      return prod;
    } else if (process.env.BE_NODE_ENV === "development") {
      return dev;
    } else {
      return local;
    }
  }
  
  export const config = getConfig();