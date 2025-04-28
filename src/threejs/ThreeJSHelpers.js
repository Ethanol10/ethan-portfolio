export const EulerToRad = (input) => {
    return (input * Math.PI) / 180; 
}

export const RadToEuler = (input) => {
    return (input * 180) / Math.PI;
}

export var isNumber = function isNumber(value) {
   return typeof value === 'number' && isFinite(value);
}
