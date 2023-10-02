
import { Validator } from "./validator.js";
import { studentRepository } from "./app.js";
import { Student } from "./student.js";
import { eventHandler } from "./app.js";

//  이벤트 처리를 객체화
class EventHandler {

  constructor() { }

  // 이벤트 소스에 이벤트핸들러 등록 -----------------------------------------------------
  eventRegist() {
    //창이 열릴때 기본정렬된 학생 보여주기
    
    window.addEventListener('load', function(event){
		eventHandler.sortStudent('기본');
	}); 

    //등록버튼 이벤트처리
    document.querySelector("#addBtn").addEventListener('click', event => {
      //버튼을 submit으로 해두었기때문에 기본 서버로 전송되는것을 막아야함.
      event.preventDefault();
      this.addStudent(event);
    });

    //삭제버튼 이벤트처리
    document.querySelector('#removeBtn').addEventListener('click', event => {
      event.preventDefault();
      this.removeStudent(event);
    });

    //목록정렬방법 선택 이벤트처리
    document.querySelector(".searchSort").addEventListener('change', event => {
      let options = event.target.options;
      let selectValue = options[options.selectedIndex].value;
      this.sortStudent(selectValue);
    });

    //검색기준 선택후 검색버튼 클릭시 이벤트처리
    document.querySelector('#searchBtn').addEventListener('click', (event) => {
      event.preventDefault();
      let options = document.querySelector('.searchSelect').options;
      let selectValue = options[options.selectedIndex].value;
      this.searchStudent(selectValue);
    });
  }

  // 학생 등록 -----------------------------------------------------------------------
  addStudent(event) {
    let ssn = document.inputForm.ssn.value;
    let name = document.inputForm.fullName.value;
    let korea = document.inputForm.korScore.value;
    let english = document.inputForm.engScore.value;
    let math = document.inputForm.mathScore.value;
    //전부 올바른 정보가 입력되면 학생 생성하게끔 if문으로 유효성검사 진행.
    if (Validator.isNum(ssn) && Validator.hasText(name) && Validator.isNum(korea) && Validator.isNum(english) && Validator.isNum(math)) {
      //받은 정보로 학생 생성
      const student = new Student(ssn, name, Number(korea), Number(english), Number(math));
      studentRepository.addStudent(student);
      // const allList = studentRepository.getStudents();
      //랭킹등록
      alert('학생 등록 완료!');

      this.sortStudent('기본');
    } else {
      alert('등록정보에 필요한 정보가 누락되었습니다. 등록정보를 다시 확인해 주세요');
    };
  };

  // 학생 목록 출력 ------------------------------------------------------------------------
  findAllStudent(event) {
    const allList = studentRepository.getStudents();
    this.scoreRanking();
    //2번째 인자가 1이면 여러명추가/출력 | 2면 한명만 추가/출력
    this.tableInStudent(allList, 1);
  };

  //학생 목록 삭제 메소드 -------------------------------------------------------------------
  removeStudent(event) {
    let ssn = Number(document.inputForm.ssn.value);
    let success = studentRepository.removeBySsn(ssn);
    if (success === true) {
      alert('삭제가 완료되었습니다..');
      this.sortStudent('기본');
    } else {
      alert('삭제에 실패하였습니다..');
    }
  };

  //학생 검색 | 조회------------------------------------------------------------------------
  searchStudent(selectValue) {
    const searchData = document.querySelector('.searchAndSelect input').value;
    switch (selectValue) {
      case '전체':
        if (Validator.isNum(searchData) || Validator.hasText(searchData)) {
          this.clearTextfiled()
          alert('전체검색에 검색어는 필요 없습니다.');
        }
        this.findAllStudent();
        break;

      case '1':
        if (Validator.isNum(searchData)) {
          let equalStudent = studentRepository.findBySsn(Number(searchData));
          if (!(equalStudent === undefined)) {
            this.clearTextfiled();
            this.tableInStudent(equalStudent, 2);
          } else {
            this.clearTextfiled()
            alert('해당하는 학생이 없습니다.');

            break;
          }
        } else {
          this.clearTextfiled();
          
          alert('학번을 입력하시오.');
        }
        break;

      case '2':
        if (Validator.hasText(searchData)) {
          let nameEqualStudents = studentRepository.findByName(searchData);
          if (!(nameEqualStudents.length === 0)) {
            this.tableInStudent(nameEqualStudents, 1);
            this.clearTextfiled();
          } else {
            this.clearTextfiled();
            alert('해당하는 학생이 없습니다.');
          };
        } else {
          this.clearTextfiled();
          alert('이름을 입력하시오.');
        }
        break;
    }
  }

  //학생 목록 정렬메서드-------------------------------------------------------------------
  sortStudent(selectValue) {
    //평균으로 정렬
    const sortAvg = (student1, student2) => {
      let a = student1.getAvg();
      let b = student2.getAvg();
      return b - a;
    };

    //이름순으로 정렬
    const sortName = (student1, student2) => {
      return student1.name < student2.name ? -1 : 1
    };

    //번호순으로 정렬
    const sortSsn = (student1, student2) => {
      let a = student1.ssn;
      let b = student2.ssn;
      return a - b;
    };
    //어떤게 선택되었는지에 따라 이벤트처리를 달리하기위한 switch문
    switch (selectValue) {
      case '기본':
        studentRepository.findAllBySort(sortSsn);
        this.findAllStudent();
        break;

      case '1':
        studentRepository.findAllBySort(sortAvg);
        this.findAllStudent();
        break;

      case '2':
        studentRepository.findAllBySort(sortName);
        this.findAllStudent();
        break;
    }
  };

  //평균점수로 등수 메기는 메서드--------------------------------------------------
  scoreRanking() {
    const studentList = studentRepository.getStudents();
    studentList.forEach(student => {
      student.rank = 1;
    });
    //명수만큼 루프돎
    for (let i = 0; i < studentList.length; i++) {
      //비교를 위한 2중for문
      for (let f = 0; f < studentList.length; f++) {
        if (studentList[i].getAvg() < studentList[f].getAvg()) {
          studentList[i].rank += 1;
        }
      }
    }
  }

  //학생을 테이블에 넣는 메소드-----------------------------------------------------
  tableInStudent(studentList, type) {
    let rows = '';
    if (type === 1) {
      studentList.forEach(student => {
        rows += `<tr>
                  <td>${student.ssn}</td>
                  <td>${student.name}</td>
                  <td>${student.kor}</td>
                  <td>${student.english}</td>
                  <td>${student.math}</td>
                  <td>${student.getSum()}</td>
                  <td>${student.getAvg().toFixed(2)}</td>
                  <td>${student.rank}</td>
                </tr>`;
      }
      );
    } else if (type === 2) {
      rows += `<tr>
              <td>${studentList.ssn}</td>
              <td>${studentList.name}</td>
              <td>${studentList.kor}</td>
              <td>${studentList.english}</td>
              <td>${studentList.math}</td>
              <td>${studentList.getSum()}</td>
              <td>${studentList.getAvg().toFixed(2)}</td>
              <td>${studentList.rank}</td>
              </tr>`;
    }
    //신규추가 HTML을 tableRow에 추가함.
    let tableRows = document.querySelector('#tableRow');
    tableRows.innerHTML = rows;
  }

  //TF들 전부 초기화 메서드
  clearTextfiled(){
    document.inputForm.ssn.value = '';
    document.inputForm.fullName.value = '';
    document.inputForm.korScore.value = '';
    document.inputForm.engScore.value = '';
    document.inputForm.mathScore.value = '';
    document.querySelector('.searchAndSelect input').value = '';
  }
}

export { EventHandler }