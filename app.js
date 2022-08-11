const hexaDigits = {
    A : 10,
    B : 11,
    C : 12,
    D : 13,
    E : 14,
    F : 15,
    10 : "A",
    11 : "B",
    12 : "C",
    13 : "D",
    14 : "E",
    15 : "F",
};

// Decimal to Other

function decimalToOther(decimalValue, base) {
    let otherValue = "";

    while(decimalValue != 0){
        let remainder = decimalValue % base;
        decimalValue = Math.floor(decimalValue / base);

        if(base == 16 && remainder % base >= 10) {
            otherValue += hexaDigits[remainder];
        } else{
            otherValue += remainder;
        }
    }

    otherValue = otherValue.split("").reverse().join("");

    if(base == 2) {
        otherValue = `0b${otherValue}`;
    }
    if(base == 8){
        otherValue = `0o${otherValue}`;
    }
    if(base == 16){
        otherValue = `0x${otherValue}`;
    }
    if(base == 10) {
        otherValue = otherValue;
    }
    return otherValue;
}

// Binary Functions

function binaryToDecimal(value) {

    let binaryValue = 0;
    let arr = 0;

    if(value.startsWith("0b")) {
        arr = value.slice(2, value.length).split("").reverse();
    } else {
        arr = value.split("").reverse();
    }

    for(let i = 0; i< arr.length; i++) {
        if(parseFloat(arr[i])) {
            binaryValue += 2**i;
        }
    }
    return binaryValue;
}

function binaryToOctal(value) {
    return decimalToOther(binaryToDecimal(value), 8);
}

function binaryToHexa(value) {
    return decimalToOther(binaryToDecimal(value), 16);
}

// Octal Functions

function octalToDecimal(value) {
    if(value.startsWith("0o")) {
        arr = value.slice(2, value.length).split("");
    } else {
        arr = value.toString().split("");
    }

    let octalAsBinary = "";

    arr.forEach((val) => {
        let valueArr = decimalToOther(val, 2).match(/\d/g);
        valueArr.shift();

        while(valueArr.length < 3) {
            valueArr.unshift("0");
        }

        octalAsBinary += valueArr.join("");
    });

    let octalValue = binaryToDecimal(octalAsBinary);
    return octalValue;
}

function octalToBinary(value) {
    return decimalToOther(octalToDecimal(value), 2);
}

function octalToHexa(value) {
    return decimalToOther(octalToDecimal(value), 16);
}

// Hexadecimal Functions 

function hexaToDecimal(value) {

    if(value.startsWith("0x")) {
        arr = value.slice(2, value.length).split("");
    } else {
        arr = value.toString().split("");
    }

    let valueArr = [];

    arr.forEach((digit) => {
        // check if a digit matches a specific hexa digits A, B, C, D, E, F

        Object.keys(hexaDigits).forEach((key) => {
            if(digit == key) {
                digit = hexaDigits[digit];
            }
        });

        valueArr.push(digit);
    });

    let hexaAsBinary = "";

    valueArr.forEach((val) => {
        let arr = decimalToOther(val, 2).match(/\d/g);
        arr.shift();

        // Convert all binary digits to 4 bit numbers
        // 01 to 0001

        while(arr.length < 4) {
            arr.unshift("0");
        }

        hexaAsBinary += arr.join("");
    });

    let hexaValue = binaryToDecimal(hexaAsBinary);
    return hexaValue;
}

function hexaToBinary(value) {
    return decimalToOther(hexaToDecimal(value), 2);
}

function hexaToOctal(value) {
    return decimalToOther(hexaToDecimal(value), 8);
}


let userNumber = document.querySelector("#userNumber");

const appendButtons = document.querySelectorAll("[data-append]");
const convertButtons = document.querySelectorAll("[data-convert]");

const userSelection = document.querySelector(".user-selection");
const convertedNum = document.querySelector(".converted-number");


convertButtons.forEach((element) => {
    element.addEventListener("click", () => {
        if(userNumber.value != null) {
            switch(element.innerText) {
                case "Binary" :

                    if(userSelection.innerText.startsWith("0b")) {
                        convertedNum.innerText = userSelection.innerText;
                    } 
                    else if (userSelection.innerText.startsWith("0o")) {
                        convertedNum.innerText = octalToBinary(userSelection.innerText);
                    }
                    else if(userSelection.innerText.startsWith("0x")) {
                        convertedNum.innerText = hexaToBinary(userSelection.innerText);
                    }
                    else {
                        convertedNum.innerText = decimalToOther(userNumber.value, 2);
                    }
                    break;

                case "Octal":
                    
                    if(userSelection.innerText.startsWith("0b")) {
                        convertedNum.innerText = binaryToOctal(userSelection.innerText);
                    }
                    else if (userSelection.innerText.startsWith("0o")) {
                        convertedNum.innerText = userSelection.innerText;
                    }
                    else if(userSelection.innerText.startsWith("0x")) {
                        convertedNum.innerText = hexaToOctal(userSelection.innerText);
                    }
                    else {
                        convertedNum.innerText = decimalToOther(userNumber.value, 8);                    
                    }
                    break;
                case "Hexadecimal" : 
                    
                    if(userSelection.innerText.startsWith("0b")) {
                        convertedNum.innerText = binaryToHexa(userSelection.innerText);
                    }
                    else if (userSelection.innerText.startsWith("0o")) {
                        convertedNum.innerText = octalToHexa(userSelection.innerText);
                    }
                    else if (userSelection.innerText.startsWith("0x")) {
                        convertedNum.innerText = userSelection.innerText;
                    }
                    else {
                        convertedNum.innerText = decimalToOther(userNumber.value, 16);
                    }
                    break;
                
                case "Decimal" :

                if(userSelection.innerText.startsWith("0b")) {
                    convertedNum.innerText = binaryToDecimal(userSelection.innerText);
                }
                else if(userSelection.innerText.startsWith("0o")) {
                    convertedNum.innerText = ocatlToDecimal(userSelection.innerText);
                }
                else if (userSelection.innerText.startsWith("0x")) {
                    convertedNum.innerText = hexaToDecimal(userSelection.innerText);
                }
                else {
                    convertedNum.innerText = userSelection.innerText;
                }
                break;
                default:
                break;
            }
        }
    });
});

appendButtons.forEach((element) => {
    element.addEventListener("click", () => {
        switch(element.innerText) {

            case "2" :
                userSelection.innerText = `0b${userNumber.value}`;
                break;

            case "8" :
                userSelection.innerText = `0o${userNumber.value}`;
                break;
            
            case "16" :
                userSelection.innerText = `0x${userNumber.value}`;
                break;
            default :
                userSelection.innerText = userNumber.value;
        }
    });
});