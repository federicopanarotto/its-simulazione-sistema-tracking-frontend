export function findObjectDifferences(obj1: any, obj2: any) {
  if (!obj1 || !obj2) return {};
  const result: any = {};

  for (const key in obj2) {
    if (!obj1.hasOwnProperty(key)) continue;

    const val1 = obj1[key];
    const val2 = obj2[key];

    if (val1 instanceof Date || val2 instanceof Date) {
      const date1 = val1 instanceof Date ? val1 : new Date(val1);
      const date2 = val2 instanceof Date ? val2 : new Date(val2);
      if (date1.getTime() !== date2.getTime()) {
        result[key] = val2;
      }
    } 
    else if (typeof val1 === "number" || typeof val2 === "number") {
      const num1 = Number(val1);
      const num2 = Number(val2);
      if (num1 !== num2) {
        result[key] = Number(val2);
      }
    } 
    else if (val1 !== val2) {
      result[key] = val2;
    }
  }

  return result;
}
