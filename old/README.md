# keytokeymapping
Key exchange in object in javascript

## Features
- Exchange the keys as specified (in the map object)
- Can apply constraints like 
    - the key-value pair is mandatory or not
- sub-object can also get key exchanged
- there can be array of sub-objects that can have key exchange
    - _Caveat_ : array that has to get key exchanged should be of same object
    - array bound can be set
        - -1 for no specific upper bound
    - can enforce only array of object(s) in resultant object
    - sub-object in input can be converted to array of objects (only one object) in resultant object.

## Map Structure
#### inputKeyName : [mandatoryOrNot, resultantKeyName, subObjectName, [arrayLowerBound, arrayUpperBound, arrayMandatoryOrNot]]

> __inputKeyName__ : The key name in the input object

> __mandatoryOrNot__ : It enforces that the key is madatory in input and resultant object or not  
> *__values__* : 
> - 0 - not mandatory
> - 1 - mandatory

> __resultantKeyName__ : The key name that has to be in resultant object in place of input key name

> __subObjectName__ : Object name if sub object in which key excange has to be performed (optional)

> __arrayLowerBound__ : Lower bound of number of array objects of subObjectName  
> *__values__* : 
> - any natural number

> __arrayUpperBound__ : Upper bound of number of array objects of subObjectName  
> *__values__* : 
> - any natural number
> - -1 if no upper bound to be set

> __arrayMandatoryOrNot__ : This is to enforce that the sub-object to be an array of objects   
> *__values__* :
> - 0 not mandatory (if object is passed in input object as value for a key then same is returned with keys exchanged)
> - 1 mandatory (if object is passed in input object as value for a key then object will be converted to array of object and returned with keys exchanged)

## Example

#### Map object:
```
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
    "key12": ["1", "32"]
};
```

#### Input object
```
var inputObject = {
    "key_one": "Hey",
    "keyTwo": "This",
    "key3": "is",
    "key_four": "---",
    "key5": "some",
    "key_six": "key",
    "keySeven": "exchange",
    "key8": "example",
    "ninthkey": {
        "somekey1": "with",
        "somekey2": "sub",
        "somekeythree": "-",
        "somekeyFour": "object",
        "somekey_five": ".",
        "sixSomekey": "123",
        "keysomeSeven": "ABC"
    },
    "key10th": "hmm",
    "key12": ":)"
};
```

#### Resultant object
```
{ '1': 'Hey',
  '2': 'This',
  '3': 'is',
  '4': '---',
  '7': 'some',
  '11': 'key',
  '12': 'exchange',
  '21': 'example',
  '24':
   { '1': 'with',
     '2': 'sub',
     '3': '-',
     '4': 'object',
     '5': '.',
     '6': '123',
     '7': 'ABC' },
  '25': 'hmm',
  '32': ':)' }
```