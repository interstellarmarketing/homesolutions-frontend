export const getTotalSteps = (estimateType: string) => {
  switch (estimateType) {
    case "roofing":
      return 8;
    default:
      return 5;
  }
};
