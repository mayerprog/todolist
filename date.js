exports.getDate = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return today.toLocaleString("en-GB", options);
};

exports.getDay = () => {
  const today = new Date();
  const options = {
    weekday: "long",
  };
  return today.toLocaleString("en-GB", options);
};


