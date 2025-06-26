const logger = (message, data = {}) => {
  const log = {
    timestamp: new Date().toISOString(),
    message,
    data
  };
  localStorage.setItem(`log_${Date.now()}`, JSON.stringify(log));
};

export default logger;
