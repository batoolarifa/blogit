class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    
) {
    super(message);
    this.statusCode = statusCode;
    this.data = null; // also study this field what is inside this data study doc of node js 
    this.message = message;
    this.success = false;
    this.errors = errors


    if (stack) {
        this.stack = stack
        
    } else{
        Error.captureStackTrace(this, this.constructor)
    }

}
}

export {ApiError}