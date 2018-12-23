# keytokeymapping
Key exchange in object in javascript

## Features
- Exchange the keyname with new keyname as specified (in the map object)
- Can apply constraints like 
    - the key-value pair is mandatory or not
    - value type (`validValueType`)
- sub-object keys can also get keyname exchanged
- there can be array of sub-objects that can have keyname exchange
    - _Caveat_ : array that has to get keyname exchanged should be of same object
    - array bound can be set
        - `maxLenArray` : max length
        - `minLenArray` : min length
        - not specifying `maxLenArray` will have no upper bound
    - can enforce only array of object(s) in resultant object (using `isObjectArray`)
- List of errors occured while validating and keyname exachage

## Map Structure

```
{
    "inputKeyName": {
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
}
```

> __inputKeyName__ : The key name in the input object

> __mandatory__ : It enforces that the key presense in input object  
> *__values__* : 
> - 0 - not mandatory
> - 1 - mandatory

> __newKeyName__ : The key name that has to be in resultant object in place of input key name, if not present the __inputkeyName__ will be retained

> __valueValidity__ : object for value validity

> __validValueType__ : array of value type that a value for the given key be of (if key `validValueType` not present there will be no type validation)
> - __values__ :
>   - any valid javascript object type
>   - `stringNumber` is a special value type which specifies that the value of number but of string type

> __subObject__ : subObject properties and constraints are specified here
> __ObjectRef__ : Sub object name that has to be used

> __isObjectArray__ : condition on the object being array or not (if key not present condition is false)
> - __values__ :  
>   - 1 for true
>   - 0 for false  

> __minLenArray__ : Lower bound of number of array objects of subObjectName  
> - *__values__* : any natural number

> __maxLenArray__ : Upper bound of number of array objects of subObjectName  
> - *__values__* : any natural number

## Example

#### Map object:
```
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
   [ { '1': 'with',
       '2': 'sub',
       '3': '-',
       '4': 'object',
       '5': '.',
       '6': '123',
       '7': 'ABC' } ],
  '25': 'hmm',
  '32': ':)',
  '34':
   [ { '1': 'with',
       '2': 'sub',
       '3': '-',
       '4': 'object',
       '5': '.',
       '6': '123',
       '7': 'ABC' } ] }
```

## Contributors

* Jasti Sri Radhe Shyam [@jastisriradheshyam](http://github.com/jastisriradheshyam)

## License (MIT)

Copyright (c) 2018 Jasti Sri Radhe Shyam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.