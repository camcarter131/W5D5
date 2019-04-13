const readline = require('readline');

const reader = readline.createInterface({
    // it's okay if this part is magic; it just says that we want to
    // 1. output the prompt to the standard output (console)
    // 2. read input from the standard input (again, console)

    input: process.stdin,
    output: process.stdout
});

class Clock {

    constructor() {
        this.ourDate = new Date();
        this.minutes = this.ourDate.getMinutes();
        this.seconds = this.ourDate.getSeconds();
        this.hours = this.ourDate.getHours();
    }

    printTime() {

        console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
    }

    // _tick() {
    //     this.seconds++;
    //     this.printTime();
    // }

    tick() {
        setInterval(() => { 
            this.seconds = (this.seconds + 1) % 60;
            if (this.seconds === 0) {
                this.minutes++;
            }
            console.log(`${this.hours}:${this.minutes}:${this.seconds}`)}
            , 1000);
    }
    
}

const clock = new Clock();
// clock.tick();

function addNumbers(sum, numsLeft, completionCallback) { 
    if(numsLeft > 0){ 
        reader.question("Input a number: ", function (answer) {
            let num = parseInt(answer);
            sum += num;
            console.log(`Current sum is: ${sum}`);
            numsLeft -= 1;
            addNumbers(sum, numsLeft, completionCallback);
        }); 
    } else if (numsLeft === 0) {
        completionCallback(sum);
    }
}

function completion(sum) {
    console.log(`This is our final sum: ${sum}`);
}

function askIfGreaterThan(e1, e2, callback) {
    reader.question( `Is ${e1} greater than ${e2}? `, function (answer) {
        if (answer === 'yes') {
            callback(true);
        }
        else if(answer === 'no') {
            callback(false);
        }
        else {
            console.log('Please answer "yes" or "no" ');
            askIfGreaterThan(e1, e2, callback);
        }
    });
    
}

function swap(answer) { 
    console.log(`${answer}`);
}

// askIfGreaterThan(4,5,swap);

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if(i < arr.length - 1) { 
        askIfGreaterThan(arr[i], arr[i + 1], function(isGreaterThan) {
            if(isGreaterThan) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                madeAnySwaps = true;
            }
            innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop );
        });
    } 
    else if(i === arr.length - 1){
        outerBubbleSortLoop(madeAnySwaps);
    }
}

// let ourArr = [3, 2, 4];

// innerBubbleSortLoop(ourArr, 0, false, () => {console.log('In outer loop');
//     console.log(ourArr);}
// );

function absurdBubbleSort(arr, sortCompletionCallback) {
    function outerBubbleSortLoop(madeAnySwaps) {
        // Begin an inner loop if you made any swaps. Otherwise, call
        // `sortCompletionCallback`.
        if (madeAnySwaps) {
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
        } else {
            sortCompletionCallback(arr);
        }
    }
    outerBubbleSortLoop(true);

    // Kick the first outer loop off, starting `madeAnySwaps` as true.
}

// absurdBubbleSort([3, 2, 1], function (arr) {
//     console.log("Sorted array: " + JSON.stringify(arr));
//     reader.close();
// });

Function.prototype.myBind = function(context) {
    return () => {
        this.apply(context);
    };
};

Function.prototype.myThrottle = function(testInterval) {
    let tooSoon = false;

    return function() {
        if (!tooSoon) {
            tooSoon = true;
            let args = Array.from(arguments);
            setTimeout( this(args), testInterval);
        } 
    };

};

const test = function (callback) {
    setInterval(() => {
        callback();
    }, 1000);
};

const testCallback = function() {
    console.log('Test Fire');
};

test(testCallback).myThrottle(5000);
