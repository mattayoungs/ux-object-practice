class Plant {
  constructor(
    type,
    isPerennial,
    leafDescription,
    leafColor,
    flowerColor,
    flowerDescription,
    gallonsWaterPerWeek,
    amountOfSunNeeded
  ) {
    this.type = type;
    this.isPerennial = isPerennial;
    this.leafDescription = leafDescription;
    this.leafColor = leafColor;
    this.flowerColor = flowerColor;
    this.flowerDescription = flowerDescription;
    this.gallonsWaterPerWeek = gallonsWaterPerWeek;
    this.amountOfSunNeeded = amountOfSunNeeded;
  }

  // This function is already done for you.
  // The changes are all highlighted in bold
  changeColor() {
    let newColors = [
      "Amber",
      "Crimson",
      "Aqua",
      "Cerulean Blue",
      "Flamingo",
      "Gun Smoke",
      "Jade",
      "Merigold",
      "Mustard",
      "Periwinkle",
    ];
    // ~~ Magic Genetic Engineering ~~
    let randIndex = Math.floor(Math.random() * newColors.length);
    if (this.isFlawed) {
      this.flowerDescription = "wilted sad buds with no pedals.";
      this.flowerColor = null;
    } else {
      this.flowerColor = newColors[randIndex];
    }
    let randomChance = Math.floor(Math.random() * 3);
    if (randomChance < 1) {
      this.isFlawed = true;
    }
  }
  describe() {
    let description = `A ${this.type} which has ${this.leafColor} leaves that ${this.leafDescription}. Its flowers are ${this.flowerColor}.`;

    return description;
  }
  clone() {
    let clone = {};
    for (let key in this) {
      clone[key] = this[key];
    }
    // clone.changeColor();
    return clone;
  }
}

class Garden {
  constructor(name) {
    this.name = name;
    this.plants = [];
  }
  describe() {
    let description = `${this.name} has ${this.plants.length} types of plants in it. It contains:`;
    for (let plant of this.plants) {
      description += "\n" + plant.describe();
    }
    return description;
  }
  addPlant(plant) {
    this.plants.push(plant);
  }
}

class Estate {
  constructor(slopePlanters, perennialGarden, roseArbor) {
    this.slopePlanters = new Garden("Slope Planters");
    this.perennialGarden = new Garden("Perennial Garden");
    this.roseArbor = new Garden("Rose Arbor");
  }
  addPlant(plant) {
    if (plant.type === "rose") {
      this.roseArbor.addPlant(plant);
    } else if (plant.isPerennial && plant.amountOfSunNeeded <= 5) {
      this.perennialGarden.addPlant(plant);
    } else {
      this.slopePlanters.addPlant(plant);
    }
  }
  describe() {
    let description = `The estate has ${this.length} gardens.`;
    for (let gardenName in this) {
      let garden = this[gardenName];
      description += "\n" + garden.describe();
    }
    return description;
  }
  calculateWaterUsagePerWeek() {
    let numGallons = 0;
    for (let garden in this) {
      for (let plant of this[garden].plants) {
        numGallons += plant.gallonsWaterPerWeek * 10;
      }
    }
    return numGallons / 10;
  }
  cloneAllTheRosesAndChangeTheirColors() {
    let clonedRoses = [];
    for (let rose of this.roseArbor.plants) {
      if (!rose.isFlawed) {
        clonedRoses.push(rose.clone());
      }
      this.roseArbor.plants = this.roseArbor.plants.concat(clonedRoses);
    }
  }
}

// --------------TESTS--------------------

let myEstate = new Estate();

let firstPlant = new Plant(
  "rose",
  true,
  "rounded with a point",
  "green",
  "red",
  "concentric circles of pedals",
  0.8,
  4
);
myEstate.addPlant(firstPlant);

let secondPlant = new Plant(
  "orchid",
  true,
  "long and wide with a point at the end",
  "green",
  "fuscia",
  "pedals surrounding a central mouth",
  1.2,
  2
);
myEstate.addPlant(secondPlant);

let thirdPlant = new Plant(
  "marigold",
  false,
  "thin and jagged along branches",
  "green",
  "yellow and orange",
  "rounded pedals in groups of five with a darker orange center",
  0.8,
  4
);
myEstate.addPlant(thirdPlant);

console.log(myEstate.describe()); // This should print the whole description of the estate.

console.log(myEstate.calculateWaterUsagePerWeek()); // This should print 2.8

myEstate.cloneAllTheRosesAndChangeTheirColors(); // This should clone the rose and make a second one.
console.log(myEstate.roseArbor.plants.length == 2);
