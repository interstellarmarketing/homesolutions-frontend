export const getTotalSteps = (estimateType: string) => {
  switch (estimateType) {
    case "roofing":
      return 9;
    default:
      return 5;
  }
};
