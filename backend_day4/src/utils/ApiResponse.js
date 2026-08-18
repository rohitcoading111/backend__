class ApiResponse {
    constructor(ststusCode,data,message = "success"){
        this.ststusCode = ststusCode
        this.data = data
        this.success = ststusCode
        this.message = message
    }
}