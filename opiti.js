// function add() {
//     function a() {
//         const x = 1;
//         return x;
//     }
    
//     function get(fun) {
//         return fun + 1
//     }
//     let y = a()

//     return get(y)
// }


// console.log(add());


// let arr = [1, 2, 3]
// let b = 4;

// let result = arr.find(el => el >= b)

// console.log(result);
// console.log('before promise');
// new Promise(function(resolve,reject){
//     resolve('done')
// })
// .then((res) => {console.log('then returned: ' + res)})

// console.log('after promise');

// Обяснение на Виктор Костадинов на промис:

class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;

        this._onSuccess = null;
        this._onError = null;

        executor(this._resolve.bind(this), this._reject.bind(this));
    }

    _resolve(result) {
        this.state = 'fulfilled';
        this.value = result;
        if (typeof this._onSuccess == 'function') {
            this._onSuccess(this.value);
        }
    }

    _reject(error) {
        this.state = 'failed';
        this.value = error;
        if (typeof this._onError == 'function') {
            this._onError(this.value);
        }
    }

    then(callback) {
        this._onSuccess = callback;
        if (this.state == 'fulfilled') {
            this._onSuccess(this.value);
        }

        return this;
    }

    catch(callback) {
        this._onError = callback;
        if (this.state == 'failed') {
            this._onError(this.value);
        }

        return this;
    }
}


function start() {
    console.log('Before promise');

    const p = new MyPromise((resolve, reject) => {
        console.log('Start execturor');
        setTimeout(reject, 2000, 'Intentional error');
        console.log('End execturor');
    }).then((result) => {
        console.log(result);
    });
    
    p.catch(onError);

    console.log('After promise');
}

function onError(error) {
    console.log('Encountered error: ', error);
}

start();