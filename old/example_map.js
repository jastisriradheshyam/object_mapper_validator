var subObjectMap = {
    "somekey1": ["1", "1"],
    "somekey2": ["0", "2"],
    "somekeythree": ["1", "3"],
    "somekeyFour": ["1", "4"],
    "somekey_five": ["1", "5"],
    "sixSomekey": ["1", "6"],
    "keysomeSeven": ["0", "7"]
};
var objectMap = {
    "key_one": ["0", "1"],
    "keyTwo": ["1", "2"],
    "key3": ["1", "3"],
    "key_four": ["1", "4"],
    "key5": ["1", "7"],
    "key_six": ["1", "11"],
    "keySeven": ["1", "12"],
    "key8": ["1", "21"],
    "ninthkey": ["1", "24",subObjectMap,[1,-1,0]],
    "key10th": ["1", "25"],
    "eleventKey": ["0", "26"],
    "key12": ["1", "32"],
    "keynew": ["1", "34",subObjectMap,[1,-1,1]]
};


module.exports = {
    objectMap : objectMap
}
