//여러 학생 목록 관리 객체
class StudentRepository {
  constructor() {
    //this = {};
    this.students = [];
    //return this;
  }

  addStudent(student) {
    this.students.push(student);
  }

  //학생전체리스트
  getStudents() {
    return this.students;
  }

  //학번으로 학생 검색
  findBySsn(ssn) {
    // return this.students.find( student => student.ssn === ssn ? true : false);
    return this.students.find(student => student.ssn === ssn || false);
  }

  //이름으로 학생 검색
  findByName(name) {
    // this.students.filter(student => student.name === name ? true : false)
    return this.students.filter(student => student.name === name || false)
  }
  //학번으로 학생 삭제
  removeBySsn(ssn) {
    let deleted = false;
    this.students.forEach((student, index) => {
      if (student.ssn === ssn) {
        this.students.splice(index, 1);
        deleted = true;
      }
    });
    return deleted;
  }
  //평균범위로 검색
  findByRange(start, end) {
    let list = [];
    this.students.forEach(student => {
      if (student.getAvg() >= start && student.getAvg() <= end) {
        list.push(student);
      }
    });
    return list;
  }
  //sort()를 이용한 정렬검색(학번,학점,총점 등등 한번에)
  findAllBySort(fn) {
    return this.students.sort(fn);
  }
}

export{ StudentRepository };