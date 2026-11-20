const timeoutPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Redis timeout"));
    }, 2000);
  });
};