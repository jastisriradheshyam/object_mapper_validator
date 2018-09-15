// Copyright 2018 Jasti Sri Radhe Shyam

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// MIT License : https://opensource.org/licenses/MIT

/**
 * Exchange the keys as per the condition set in the mapObject.
 * @function
 * @param {object} inputObject - The input object that has keys to be replaced.
 * @param {object} mapObject - The map object that maps the key from input to resultant object key.
 */
var mapKeyToKey = function (inputObject, mapObject) {
    return new Promise((resolve, reject) => {
        let resultJSONObject = {};
        // Getting keys arrays to compare with map object keys
        let inputObjectKeys = Object.keys(inputObject);
        // variable to store index of the element of inputObjectKeys array that has to be removed 
        let removeIndex;
        // Getting key from map Object
        for (let key in mapObject) {
            // Check if the key is present in the input object and store index of that element present in inputObjectKeys array
            if (inputObjectKeys.find((element, index) => {
                removeIndex = index;
                return element == key;
            })) {
                // Removing the element from the inputObjectKeys array
                inputObjectKeys.splice(removeIndex, 1);
                // If there is sub object or array of key value pairs
                if (mapObject[key][2]) {
                    // If the value of the key has array of objects condition
                    if (mapObject[key][3]) {
                        // Checks if array is mandatory and input object is not array and recommended min. array size in less than or equal to 1 
                        if (mapObject[key][3][2] == 1 && !Array.isArray(inputObject[key]) && mapObject[key][3][0] <= 1) {
                            mapKeyToKey(inputObject[key], mapObject[key][2]).then((exchangeObject) => {
                                resultJSONObject[mapObject[key][1]] = [];
                                resultJSONObject[mapObject[key][1]][0] = exchangeObject;
                            }).catch((err) => {
                                reject(err);
                            });
                        } else if (mapObject[key][3][2] == 0 && !Array.isArray(inputObject[key])) { // If condition is to have object if input is also an object
                            mapKeyToKey(inputObject[key], mapObject[key][2]).then((exchangeObject) => {
                                resultJSONObject[mapObject[key][1]] = exchangeObject;
                            }).catch((err) => {
                                reject(err);
                            });
                        } else if (Array.isArray(inputObject[key])) { // If input value is array of objects
                            let inputArrayLength = inputObject[key].length;
                            // If (lower_bound =< array_length =< higher_bound) or (lower_bound =< array_length [if higher_bound == -1])
                            if ((inputArrayLength >= mapObject[key][3][0] && inputArrayLength <= mapObject[key][3][1]) || (inputArrayLength >= mapObject[key][3][0] && mapObject[key][3][1] == -1)) {
                                // Array initializaion
                                resultJSONObject[mapObject[key][1]] = [];
                                for (let i = 0; i < inputObject[key].length; i++) {
                                    mapKeyToKey(inputObject[key][i], mapObject[key][2]).then((exchangeObject) => {
                                        resultJSONObject[mapObject[key][1]][i] = exchangeObject;
                                    }).catch((err) => {
                                        reject(err);
                                    });
                                }
                            } else { // If Array has length in required bound
                                reject("Error in array bound key : '" + key + "'");
                            }
                        } else { // If no condition satisfies (having array of objects condition)
                            reject("Error in array portion key : '" + key + "'");
                        }
                    } else { // if there is only object to the key as value as condition
                        mapKeyToKey(inputObject[key], mapObject[key][2]).then((exchangeObject) => {
                            resultJSONObject[mapObject[key][1]] = exchangeObject;
                        }).catch((err) => {
                            reject(err);
                        });
                    }
                } else { // If no object in the value for the ket as condition
                    resultJSONObject[mapObject[key][1]] = inputObject[key];
                }
            } else {
                // Checks that the key from map object is mandatory or not 
                if (mapObject[key][0] == 1) {
                    reject("key : '" + key + "' not present");
                }
            }
        }
        // Return the resultant object
        resolve(resultJSONObject);
    });
}

module.exports = {
    mapKeyToKey: mapKeyToKey
};