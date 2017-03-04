const {
    wrap
} = require('../../');
const calc = require('../../examples/calc');

wrap(calc)(process.argv)
.then(function (ret) {
    console.log(ret);
});
