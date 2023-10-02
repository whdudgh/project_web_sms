class Validator{
  /**
   * 
   * @param {string} 문자열값 
   * @returns 문자열이 들어왔는지 아닌지
   */
  static hasText (value) {
    return /^[a-zA-Zㄱ-힣-_.]{2,12}$/.test(value) && value.length !==0;
    // if(value == undefined || value.length === 0){
    //   return false;
    // }
    // return true;
  };
  
  /**
   * 
   * @param {Number} 숫자값 
   * @returns 숫자가 들어왔는지 아닌지
   */
  static isNum (value){
    return /^[0-9]*$/.test(value) && value.length !== 0;
    // if(value == undefined || isNaN(value) === true){
    //   return false;
    // }
    // return true;
  };
}

export{ Validator };