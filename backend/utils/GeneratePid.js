function Generate(){
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const number = "1234567890";
    const symbol = '!@#$%^&*?|';
    const allSymbols = uppercase + lowercase + number + symbol;
    let pid = "";    
    for(let i = 0;i < 8; i++){
        let ind = Math.floor(Math.random() * allSymbols.length);
        pid += allSymbols[ind];
    }
    console.log("pid is " , pid);
    return pid;
}

module.exports = Generate;