class ApiError extends Error {
    constructor(
        ststusCode,
        message = "something went wrong",
        error = [],
        stsck = ""

    ){
        super(message)
        this.ststusCode = ststusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = error

        if(stsck) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}