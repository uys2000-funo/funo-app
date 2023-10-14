/**
 * Adds random amount of example data(with taget class)
 * to the list with given percentage
 * @constructor
 * @param target Target Class to create Objects and push to list
 * @param list Target List to add created Objects
 * @param args parameters of target Class
 * @param percentage precentage to add more or less example
 * @returns returns list paramater back.
 */
export const addExamplesToData = function <
  T extends new (...args: any[]) => any
>(
  target: T,
  list: Array<InstanceType<typeof target>>,
  args: ConstructorParameters<T>,
  percentage = 0.5
) {
  if (percentage >= 1) percentage = 0.5;
  const add = (isFirstTime = true) => {
    if (isFirstTime || Math.random() < percentage) {
      list.push(new target(...args));
      add(false);
    }
  };
  add();
  return list;
};
