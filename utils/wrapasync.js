//The main motive of this function is to take a function as paramater 
//and then paas  it  to a return function as parameter then that function will catch the error of the  parameter function  and call the next middleware
function wrapasync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    }
}
module.exports=wrapasync;