export const formatDate = (timestamp) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
