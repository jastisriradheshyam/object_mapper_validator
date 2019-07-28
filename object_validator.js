// Copyright 2019 Jasti Sri Radhe Shyam

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
 * Exchange the keys and validate as per the condition set in the mapObject.
 * @function
 * @param {object} inputObject - The input object that has keys to be replaced.
 * @param {object} mapObject - The map object that maps the key from input to resultant object key.
 */
var validate = function (inputObject, mapObject) {
    let errorList = {};

    // Getting keys arrays to compare with map object keys
    if (typeof (inputObject) == "undefined" || inputObject == null) {
        inputObject = {};
    }

    try {
        let inputObjectKeys = Object.keys(inputObject);

        // variable to store index of the element of inputObjectKeys array that has to be removed 
        let removeIndex;
        
        // Iterating keys from map Object
        for (let key in mapObject) {

            // Check if the key is present in the input object and store index of that element present in inputObjectKeys array
            if (inputObjectKeys.find((element, index) => {
                removeIndex = index;
                return element == key;
            })) {

                // Removing the element from the inputObjectKeys array
                inputObjectKeys.splice(removeIndex, 1);

                // ----- Value validation | Start | -----
                if (typeof (mapObject[key]["valueValidity"]) == "object") {

                    // valid object type check
                    let validValueType = mapObject[key]["valueValidity"]["validValueType"];
                    if (Array.isArray(validValueType) == true) {
                        let validTypeFlag = false;

                        // Traversing through all valid types array
                        for (let validityIndex = 0; validityIndex < validValueType.length; validityIndex++) {
                            const validType = validValueType[validityIndex];
                            if (typeof (inputObject[key]) == validType || (typeof (+inputObject[key]) == "number" && validType == "stringNumber")) {
                                validTypeFlag = true;
                            }
                        }
                        // check whether value is of valid type
                        if (validTypeFlag == false) {
                            errorList[key] = "key value not a valid type. Valid key type list : " + JSON.stringify(validValueType);
                        }
                    }
                }
                // ----- Value validation | End | -----

                // ----- Sub Object | Start | -----                
                if (typeof (mapObject[key]["subObject"]) == "object" && typeof (inputObject[key]) == "object") {
                    if (mapObject[key]["subObject"]["isObjectArray"] == 1) {
                        if (Array.isArray(inputObject[key]) == true) {
                            let arrayObjectLength = inputObject[key].length;
                            if (mapObject[key]["subObject"]["minLenArray"] && mapObject[key]["subObject"]["minLenArray"] >= 0 && mapObject[key]["subObject"]["minLenArray"] > arrayObjectLength) {
                                errorList[key] = "Array length less than minimum";
                            } else if (mapObject[key]["subObject"]["maxLenArray"] && mapObject[key]["subObject"]["maxLenArray"] < arrayObjectLength) {
                                errorList[key] = "Array length more than maximum";
                            } else {

                                // ----- Sub object array Traversal | Start | -----                
                                let errorObjectArray = [];
                                for (let objectArrayIndex = 0; objectArrayIndex < inputObject[key].length; objectArrayIndex++) {
                                    let resultObject = validate(inputObject[key][objectArrayIndex], mapObject[key]["subObject"]["ObjectRef"]);
                                    if (resultObject != null) {
                                        errorObjectArray.push(resultObject);
                                    }
                                }
                                if (errorObjectArray.length != 0) {
                                    errorList[key] = errorObjectArray;
                                }
                                // ----- Sub object array Traversal | Start | -----                
                                
                            }
                        } else {
                            errorList[key] = "Key is not an array";
                        }
                    } else {
                        let resultObject = validate(inputObject[key], mapObject[key]["subObject"]["ObjectRef"]);
                        if (resultObject != null) {
                            errorList[key] = resultObject;
                        }
                    }
                }
                // ----- Sub Object | End | -----                

            } else {

                // Checks that the key from map object is mandatory or not 
                if (mapObject[key]["mandatory"] == 1) {
                    errorList[key] = 'key not found';
                }
            }
        }
    } catch (err) {
        errorList.validate_error = "Error while validating ERROR : " + err;
    }

    // Return the result and error list
    if (Object.keys(errorList).length == 0) {
        return  null;
    } else {
        return errorList;
    }
};

module.exports = {
    validate: validate
};
