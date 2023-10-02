//학생객체 생성을 위한 틀(생성자 함수)
// export
class Student {
  constructor(ssn, name, kor, english, math) {
    //this = {};
    this.ssn = ssn;
    this.name = name;
    this.kor = kor;
    this.english = english;
    this.math = math;
    //return this; 
  }
  //공통속성 추가
  static schoolName = 'Ezen초등학교';

  getSum() {
    return this.kor + this.english + this.math;
  }

  getAvg() {
    return this.getSum() / 3;
  }
  //object프로토타입 객체의 toString() 오버라이딩
  toString() {
    return `${this.ssn} \t ${this.name} \t ${this.kor} \t ${this.english} \t ${this.math} \t ${this.getSum()} \t ${this.getAvg()}`
  }
}
export { Student };