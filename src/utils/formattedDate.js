const showFormattedDate = (date) => {
  const commentDate = new Date(date).getTime();
  const now = new Date().getTime();

  const difference = now - commentDate;

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days > 1) {
    return `${days} hari yang lalu`;
  } else if (hours > 1) {
    return `${hours} jam yang lalu`;
  } else if (minutes > 1) {
    return `${minutes} menit yang lalu`;
  } else {
    return "Baru saja";
  }
};

export { showFormattedDate };
