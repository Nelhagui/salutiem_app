// En tu archivo utils, por ejemplo, arrayUtils.js
export const arraysHaveDifferences = (arr1, arr2) => {
  // Paso 1: Compara las longitudes
  if (arr1.length !== arr2.length) {
    return true; // Diferencia en las longitudes
  }
  if(arr1.length == 0){
    return false;
  }
  
  return arr1.some((obj1, index) => {
    // Paso 3: Compara los objetos
    return !compareObjects(obj1, arr2[index]);
  });
};

// Método de comparación para objetos
const compareObjects = (obj1, obj2) => {
  // Convierte los objetos a JSON y compara las cadenas resultantes
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};