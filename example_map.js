var subObjectMap = {
    "somekey1": {
        "mandatory": "1"
        ,"newKeyName" : "1"
    }
    ,"somekey2": {
        "mandatory": "1"
        ,"newKeyName" : "2"
    }
    ,"somekeythree": {
        "mandatory": "1"
        ,"newKeyName" : "3"
    }
    ,"somekeyFour": {
        "mandatory": "1"
        ,"newKeyName" : "4"
    },
    "somekey_five": {
        "mandatory": "1"
        ,"newKeyName" : "5"
    },
    "sixSomekey": {
        "mandatory": "1"
        ,"newKeyName" : "6"
    },
    "keysomeSeven": {
        "mandatory": "0"
        ,"newKeyName" : "7"
    }
};
var objectMap = {
    "key_one": {
        "mandatory": "0"
        ,"newKeyName" : "1"
    },
    "keyTwo": {
        "mandatory": "1"
        ,"newKeyName" : "2"
    },
    "key3": {
        "mandatory": "1"
        ,"newKeyName" : "3"
    },
    "key_four": {
        "mandatory": "1"
        ,"newKeyName" : "4"
    },
    "key5": {
        "mandatory": "1"
        ,"newKeyName" : "7"
    },
    "key_six": {
        "mandatory": "1"
        ,"newKeyName" : "11"
    },
    "keySeven": {
        "mandatory": "1"
        ,"newKeyName" : "12"
    },
    "key8": {
        "mandatory": "1"
        ,"newKeyName" : "21"
    },
    "ninthkey": {
        "mandatory": "1"
        ,"newKeyName" : "24"
        ,"subObject" : {
            "ObjectRef": subObjectMap
            , "isObjectArray": 1
            , "minLenArray" : 0
        }
    },
    "key10th": {
        "mandatory": "1"
        ,"newKeyName" : "25"
    },
    "eleventKey": {
        "mandatory": "0"
        ,"newKeyName" : "26"
    },
    "key12": {
        "mandatory": "1"
        ,"newKeyName" : "32"
    },
    "keynew": {
        "mandatory": "1"
        ,"newKeyName" : "34"
        ,"subObject" : {
            "ObjectRef": subObjectMap
            , "isObjectArray": 1
            , "minLenArray" : 1
        }
    }
};


module.exports = {
    objectMap : objectMap
}
