// Copyright 2018,2019 Jasti Sri Radhe Shyam

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
var mapAndValidate = function (inputObject, mapObject) {
    let resultJSONObject = {};
    let errorList = [];

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
                let appendObject = inputObject[key];

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
                            errorList.push({
                                "key": key
                                , "error": "key value not a valid type. Valid key type list : " + JSON.stringify(validValueType)
                            });
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
                                errorList.push({ "key": key, "error": "Array length less than minimum" });
                            } else if (mapObject[key]["subObject"]["maxLenArray"] && mapObject[key]["subObject"]["maxLenArray"] < arrayObjectLength) {
                                errorList.push({ "key": key, "error": "Array length more than maximum" });
                            } else {

                                // ----- Sub object array Traversal | Start | -----                
                                let resultObjectArray = [];
                                let errorObjectArray = [];
                                for (let objectArrayIndex = 0; objectArrayIndex < inputObject[key].length; objectArrayIndex++) {
                                    let resultObject = mapAndValidate(inputObject[key][objectArrayIndex], mapObject[key]["subObject"]["ObjectRef"]);
                                    resultObjectArray.push(resultObject["result"]);
                                    if (resultObject["error"] != null) {
                                        errorObjectArray.push(resultObject["error"]);
                                    }
                                }
                                appendObject = resultObjectArray;
                                if (errorObjectArray.length != 0) {
                                    errorList.push({ "key": key, "error": errorObjectArray });
                                }
                                // ----- Sub object array Traversal | Start | -----                
                                
                            }
                        } else {
                            errorList.push({ "key": key, "error": "Key is not an array" });
                        }
                    } else {
                        let resultObject = mapAndvalidate(inputObject[key], mapObject[key]["subObject"]["ObjectRef"]);
                        appendObject = resultObject["result"];
                        if (resultObject["error"] != null) {
                            errorList.push({ "key": key, "error": resultObject["error"] });
                        }
                    }
                }
                // ----- Sub Object | End | -----                

                // Replacing object key name and assigning value
                if (typeof (mapObject[key]["newKeyName"]) == "string" && mapObject[key]["newKeyName"] != '') {
                    resultJSONObject[mapObject[key]["newKeyName"]] = appendObject;
                } else {
                    resultJSONObject[key] = appendObject;
                }
            } else {

                // Checks that the key from map object is mandatory or not 
                if (mapObject[key]["mandatory"] == 1) {
                    errorList.push({
                        "key": key
                        , "error": 'key not found'
                    });
                }
            }
        }
    } catch (err) {
        errorList.push("Error while validating ERROR : " + err);
    }

    // Return the result and error list
    if (errorList.length == 0) {
        return {
            "result": resultJSONObject
            , "error": null
        };
    } else {
        return {
            "result": null
            , "error": errorList
        };
    }
};

module.exports = {
    mapAndValidate: mapAndValidate
};
