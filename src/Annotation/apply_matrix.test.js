import applyMatrix, { parsePathString, constructPathString } from './apply_matrix';

const samplePathStrings = [
    "M10,10 L20,20",
    "M0,0 L0,6.67 L3.33,3.33 Z"
];

const sampleParsedPathStrings = [
    [
        { type: "M", x: 10, y: 10 },
        { type: "L", x: 20, y: 20 }
    ],
    [
        { type: "M", x: 0, y: 0 },
        { type: "L", x: 0, y: 6.67 },
        { type: "L", x: 3.33, y: 3.33 },
        { type: "Z", x: null, y: null }
    ]
];

it("parsePathString", () => {
    samplePathStrings.forEach((string, index) => {
        expect(parsePathString(string)).toEqual(sampleParsedPathStrings[index]);
    });
});

it("constructPathString", () => {
    sampleParsedPathStrings.forEach((parsedString, index) => {
        expect(constructPathString(parsedString)).toEqual(samplePathStrings[index]);
    });
});

it("applyMatrix", () => {
    samplePathStrings.forEach(string => {
        expect(applyMatrix([1,0,0,1,0,0], string)).toEqual(string);
    });
    
    expect(applyMatrix([2,0,0,1,0,0], "M10,10 L20,20 L40,20 Z")).toEqual("M20,10 L40,20 L80,20 Z");
    expect(applyMatrix([1,0,0,1,30,15], "M10,10 L20,20")).toEqual("M40,25 L50,35");
    expect(applyMatrix([2,0,0,2,10,10], "M10,10 L20,20")).toEqual("M30,30 L50,50");
});