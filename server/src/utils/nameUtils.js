export const nameInitialUppercase = (name) => {
  const nameSplit = name.split(" ");
  const nameArrayNoWhiteSpace = nameSplit.filter((element) => element !== "");
  nameArrayNoWhiteSpace.forEach((element, index, array) => {
    array[index] =
      array[index].slice(0, 0) +
      array[index].charAt(0).toUpperCase() +
      array[index].slice(1);
  });
  return nameArrayNoWhiteSpace.join(" ");
};
