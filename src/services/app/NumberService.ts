export const range = function (from: number, to: number, fixed?: number) {
  return Array.from({ length: to }, (x, i) =>
    fixed != undefined ? fixed : i + from
  );
};
