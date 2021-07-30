 const debounce = (func, wait)  => {
    var timeout;
    return function executedFunction() {
        var context = this;
        var args = arguments;

        const  timeOutFunc = () => {
            timeout = null;
            func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(timeOutFunc, wait);
    };
};
export default debounce