const example_map = require('./example_map.js');
var ov = require('./object_validator');

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
    // "key12": ":)",
    "keynew" : [{
        "somekey1": "with",
        "somekey2": "sub",
        "somekeythree": "-",
        "somekeyFour": "object",
        // "somekey_five": ".",
        // "sixSomekey": "123",
        "keysomeSeven": "ABC"
    },{
        "somekey1": "with",
        "somekey2": "sub",
        "somekeythree": "-",
        "somekeyFour": "object",
        "somekey_five": ".",
        // "sixSomekey": "123",
        "keysomeSeven": "ABC"
    }]
};
let resultObject = ov.validate(inputObject, example_map.objectMap);
console.dir(resultObject,{"depth":10});
