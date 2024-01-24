export const createIdentifier = () =>
  Math.floor(1000 * (Date.now() + Math.random())).toString(36);
