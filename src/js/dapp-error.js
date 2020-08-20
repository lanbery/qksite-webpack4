function DappError(err) {
  this.name = "DappError";
  this.code = 999999;
  this.message = "Dapp internal error.";
  if (typeof err === "string") {
    this.message = err.toString();
    this.code = -999999
  } else if (typeof err === "number") {
    this.code = err 
  } else if (typeof err === "object" && (err.code || err.message)) {
    if(err.code) {
      this.code = err.code
    }else {
      this.code = -999999;
    }
    if(err.message)  this.message = err.message
  } else {
    this.code = 999999
    this.message = 'unknow error'
  }

  this.stack = (new Error()).stack
};

DappError.prototype = Object.create(Error.prototype);
DappError.prototype.constructor = DappError;
DappError.UNKNOW_ERROR = 999999
DappError.prototype.code = -999999


export default DappError
