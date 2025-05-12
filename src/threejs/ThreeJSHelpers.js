export const EulerToRad = (input) => {
    return (input * Math.PI) / 180; 
}

export const RadToEuler = (input) => {
    return (input * 180) / Math.PI;
}

export var isNumber = function isNumber(value) {
   return typeof value === 'number' && isFinite(value);
}

export const easeInOutParabola = (progress, offset = 0) => {
    let shouldInvert = progress < 0; 
    let result = 0;
    let absoluteProgress = Math.abs(progress);

    result = Math.pow(absoluteProgress + offset, 1/1.4);

    if (shouldInvert){
        return (-1) * result;
    }

    return result;
}

//Can be a value from -1 to 1, treat 
export const easeInOutQuint = (progress) => {
    let shouldInvert = progress < 0; 
    let result = 0;
    let absoluteProgress = Math.abs(progress);

    if (absoluteProgress < 0.5){
        result = 16 * Math.pow(absoluteProgress, 5);
    }
    else{
        result = 1 - Math.pow(-2 * absoluteProgress + 2, 5) / 2;
    }

    if (shouldInvert){
        return (-1) * result;
    }

    return result;
}
