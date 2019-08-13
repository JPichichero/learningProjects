/////////////////////////////////
// CODING CHALLENGE

/* Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:

Parks
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of all the town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees

Streets
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc. */

class BaseElement {
    constructor (name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
};

class Park extends BaseElement {
    constructor (name, buildYear, treeCount, parkArea) {
        super(name, buildYear);
        this.treeCount = treeCount;
        this.parkArea = parkArea;
        
        parkList.push(this);
    }

    calculateTreeDensity() {
        let treeDensity = this.treeCount / this.parkArea;
        return treeDensity;
    }

};

class Street extends BaseElement {
    constructor (name, buildYear, streetLength, streetSize) {
        super(name, buildYear);
        this.streetLength = streetLength;
        this.streetSize = streetSize;
        
        streetList.push(this);
    }
};

let parkList = [];
    const homePark = new Park('Home Park', 1950, 975, 500);
    const platePark = new Park('Plate Park', 1985, 500, 130);
    const chairPark = new Park('Chair Park', 2008, 1001, 100);

let streetList = [];
    const glassStreet = new Street('Glass Street', 1905, 100, 'Unknown');
    const penStreet = new Street('Pen Street', 1975, 10, 'Tiny');
    const bookStreet = new Street('Book Street', 2000, 50, 'Small');
    const lampStreet = new Street('Lamp Street', 2010, 100, 'Huge');

/////////////////////////////////////////////////////////
////////////////////// Park Report //////////////////////
/////////////////////////////////////////////////////////

console.log(`--------- Park Report ---------`)

// 1. Tree Density Calculation
parkList.forEach(function(element) {
    console.log(`For ${element.name}, the tree density is ${element.calculateTreeDensity()} per hectare.`)
});

// 2. Average Age for Parks Calculation
let parkAge = [];

parkList.forEach(function(element) {
    parkAge.push(new Date().getFullYear() - element.buildYear);
});

let averageParkAge = parkAge.reduce((accumulator, parkAge) => accumulator + parkAge, 0) / parkAge.length;

console.log(`The average age of our parks is: ${averageParkAge} years old.`);

// 3. Name of the Park with more than 1,000 trees.
parkList.forEach(function(element) {
    if (element.treeCount >= 1000) {
    console.log(`${element.name} has ${element.treeCount} trees.`)
    };
});

/////////////////////////////////////////////////////////
///////////////////// Street Report /////////////////////
/////////////////////////////////////////////////////////

console.log(`-------- Street Report --------`)

// 4. Total and average length of the town's streets
// Total Length
let totalStreetLength = streetList.reduce((accumulator, streetList) => accumulator + streetList.streetLength, 0);

console.log(`The total length of all the town's streets are: ${totalStreetLength} miles`);

// Average Length
let averageStreetLength = totalStreetLength / streetList.length;

console.log(`The average length of the town's streets are: ${averageStreetLength} miles.`);

// 5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
streetList.forEach(function(element) {
    if (element.streetSize === 'Unknown') {
        console.log(`The street size for ${element.name} is: Normal.`)
    } else {
        console.log(`The street size for ${element.name} is: ${element.streetSize}.`)
    }
});