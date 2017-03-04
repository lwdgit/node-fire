exports.a = function() {
    console.log('function a');
    return {
        c: 1
    }
}

exports.b = function*() {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve({
                d: 4
            });
        }, 500);
    })
}
