const timeoutPromise = (timeout = 2000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Redis timeout: operation exceeded 2 seconds"));
    }, timeout);
  });
};

export default timeoutPromise;