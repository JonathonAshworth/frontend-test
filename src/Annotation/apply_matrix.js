import xform_point from '../__lib__/xform_point';

/*
    Applies a matrix transform to an SVG path string (a.k.a "d" attribute)
    - matrix, a length 6 array of numbers
    - pathString, a valid SVG path string containing only space-seperated commands of the format 'cx,y'
    Currently only supports the M, L and Z path commands
*/
export default (matrix, pathString) =>
    constructPathString(parsePathString(pathString).map(xform_point(matrix)))


// Parses the path string, returning an array of objects of the form {x, y, type}
export function parsePathString(pathString) {

    const commands = pathString.split(' ');

    return commands.map(command => {
        const type = command.charAt(0);
        const coords = command.substring(1).split(',');
        return {
            type,
            x: coords[0] !== "" ? parseFloat(coords[0]) : null,
            y: coords.length > 1 ? parseFloat(coords[1]) : null
        };
    });
}


// Reconstructs the path string from an array of objects of the aforementioned type
export function constructPathString(commands) {

    let pathString = "";

    commands.forEach((command, index) => {
        pathString += command.type;
        if(command.type !== "Z") {
            pathString += command.x + "," + command.y;
        }
        if(index < commands.length - 1) {
            pathString += " ";
        }
    });

    return pathString;
}