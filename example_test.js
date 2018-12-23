const example_map = require('./example_map.js');
var keytokey = require('./keyMappingValidation.js');

var inputObject = {
    "key_one": "Hey",
    "keyTwo": "This",
    "key3": "is",
    "key_four": "---",
    "key5": "some",
    "key_six": "key",
    "keySeven": "exchange",
    "key8": "example",
    "ninthkey": [{
        "somekey1": "with",
        "somekey2": "sub",
        "somekeythree": "-",
        "somekeyFour": "object",
        "somekey_five": ".",
        "sixSomekey": "123",
        "keysomeSeven": "ABC"
    }],
    "key10th": "hmm",
    "key12": ":)",
    "keynew" : [{
        "somekey1": "with",
        "somekey2": "sub",
        "somekeythree": "-",
        "somekeyFour": "object",
        "somekey_five": ".",
        "sixSomekey": "123",
        "keysomeSeven": "ABC"
    }]
};
let resultObject = keytokey.mapKeyToKey(inputObject, example_map.objectMap);
if (resultObject.error == null) {
    console.log(resultObject.result);
}