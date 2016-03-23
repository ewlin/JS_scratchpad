//recursively parses molecule formula and returns an object that counts the number of atoms of each element in molecule
//Function takes a chemical formula and returns an object counting the number of atoms for each element in the compound. 

// Example: parseMolecule("[(CH3)4C2O2B]2") => {C: 12, H: 24, O: 4, B: 2} 

//Should be able to handle formulas with deeply-nested groups of elements (including non-sensical examples like "H2O[(NaCl[OH3]5)5O2B]4")

var parseMolecule = function(formula) {

    //for TCO if available...though kinda silly. Most chemical formulas aren't nested too deeply. 
    'use strict';

    //preprocess formula string and strip out the different braces/brackets and whitespace
    var updatedFormula = updatedFormula ||
                         formula.replace(/\]|\}/g, ')')
                        .replace(/\{|\[/g, '(')
                        .replace(/\s/g, ''), 

    //match all of the inner-most parenthesis-grouped elements e.g. (H2OCl)3
        nested = updatedFormula.match(/\(\w*\)\d*/g),

    //regexp matches
        atom = /[A-Z][a-z]*/, //e.g. H or Cl or Uuo
        nums = /\d+/;

    //logic
    if (nested) { //e.g. if groupings like "(H2OCl)3", "(SO4)2" are in molecule input
        nested.forEach(function(innerMol) { //A: "(H2OCl)3" B: "(SO4)2"
            var flattened = "",
                innerMolArr = (innerMol.slice(1)).split(')'), // "(SO4)2" --> "SO4)2" --> ["SO4","2"]
                multiple = Number(innerMolArr[1]) || 1; // ["S04","2"] -> 2

            moleculeToElementsArray(innerMolArr[0]) // ["SO4","2"][0]--> "SO4" --> .... --> ["S","O4"].forEach(fn)...
                .forEach(function(ele) {
                    var numOf = Number(ele.replace(nums, function(digits) { return ',' + digits }).split(',')[1]) || 1;
                    flattened += (ele.match(atom) + (numOf * multiple));
                });

            updatedFormula = updatedFormula.replace(innerMol, flattened); //replace (H2OCl)3 with H6O3Cl3
        });

        return parseMolecule(updatedFormula);

    } else {
        /*takes something like "H6O3Cl3", splits into an array--i.e. ["H6","O3","Cl3"], and reduces array to returns an object with element counts for each /molecule--e.g. {H: 6, O: 3, Cl: 3}
        */
        return moleculeToElementsArray(updatedFormula)
                .reduce(function(elementCount, element) {
                    var numOf = element.match(nums) || 1;
                    if (elementCount.hasOwnProperty(element.match(atom)))
                        elementCount[element.match(atom)] += Number(numOf);
                    else
                        elementCount[element.match(atom)] = Number(numOf);
                    return elementCount;
                }, {});
    }

    //helper function
    // "SO4" --> ",S,O4" --> ["","S","O4"] --> ["S","O4"]
    function moleculeToElementsArray(mole) {
        return mole.replace(/([A-Z])/g, function(el) { return ',' + el })
                   .split(',')
                   .filter(function(el) {return !!el });
    }
}

