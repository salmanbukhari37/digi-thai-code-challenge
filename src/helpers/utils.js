export const sortData = (data, selector) => {
  return data.sort((a, b) => {
    // Use toUpperCase() to ignore character casing
    const bandA = a[selector];
    const bandB = b[selector];

    let comparison = 0;

    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  });
};
