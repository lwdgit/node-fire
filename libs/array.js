//operate array with side effects

function splice(obj, start, length, ...args) {
    return [].splice.call(obj, start, length, ...args);
}

exports.concat = function(obj, params) {
    splice(obj, obj.length, 0, ...params);
    return obj;
}

exports.slice = function(obj, start = 0, end = obj.length) {
    start = ~~start;
    end = ~~end;
    if (start < 0) {
        splice(obj, 0, obj.length + start);
    } else {
        splice(obj, 0, start);
    }
    
    let length = end - start;
    end = Math.min(0, end);
    if (end >= 0 && length <=0 ) {
        length = 0;
    }
    if (end < 0) {
        length++;
    }

    splice(obj, length, obj.length);
    return obj;
}