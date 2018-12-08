let subObjectName2 = {
    "keyName3": {
        "mandatory": "1"
        , "newKeyName": "newKeyMan"
        , "valueValidity" : {
            "validValueType" : ["number","stringNumber"]
        }
    }
};

let objectMap = {
    "keyName1": {
        "mandatory": "1"
        , "newKeyName": "newKeyName1"
        , "valueValidity": {
            "validValueType": ["string","stringNumber"]
        }
    }
    , "keyName2": {
        "mandatory": "0"
        , "subObject": {
            "ObjectRef": subObjectName2
            , "isObjectArray": 1
            , "minLenArray" : 1
            , "maxLenArray" : 3
        }
    }
};

var validate = require("./keytokeymapping");

let obj = {
    keyName1: "1"
    , keyName2: [{
        "keyName3" : "-1.232"
    },{
        "keyName3" : "-1.232"
    },{
        "keyName3" : "-1.232"
    }]
};
hello = async () => {

    var objn = validate.mapKeyToKey(obj, objectMap);
    console.log("s d :: ", JSON.stringify(objn));
}

hello();