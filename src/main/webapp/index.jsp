<%@ page contentType="text/html; charset=utf-8" %>
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SchoolScore</title>
  <link rel="stylesheet" href="css/school.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
  <script type="module" defer src="./js/app.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
  <header>
    <h1 class="mainHead display-4 text-center fw-bold">EZEN 초등학교 성적 관리</h1>
    
  </header>
  <!--여기 학번 이름 국어점수 영어점수 수학점수 등록, 삭제버튼 들어감-->
  <section class="container">
    <form action="#" name="inputForm">
      <div class="line1 row m-auto mb-5">
        <div class="col-md-2">
          <input type="number" class="form-control" placeholder="학번" name="ssn">
        </div>
        <div class="col-md-2">
          <input type="text" class="form-control" placeholder="이름" name="fullName">
        </div>
        <div class="col-md-2">
          <input type="number" class="form-control" placeholder="국어점수" name="korScore">
        </div>
        <div class="col-md-2">
          <input type="number" class="form-control" placeholder="영어점수" name="engScore">
        </div>
        <div class="col-md-2">
          <input type="number" class="form-control" placeholder="수학점수" name="mathScore">
        </div>
        <div class="addAndDeleteBT col-md-2">
          <button type="submit" class="btn btn-primary" id="addBtn">등록</button>
          <button type="submit" class="btn btn-primary" id="removeBtn">삭제</button>
        </div>
      </div>
    </form><!-----------------------line1 종료------------------------------->
    <!--검색과 셀렉트들-->
    <div class="searchAndSelect row">
      <div class="col-md-2">
        <select class="searchSelect form-select">
          <option selected>전체</option>
          <option value="1">학번</option>
          <option value="2">이름</option>
        </select>
      </div>
      <div class="col-md-2">
        <input type="search" class="form-control" placeholder="검색어" id="searchWord">
      </div>
      <div class="col-md-2">
        <button type="submit" class="btn btn-primary" id="searchBtn">검색</button>
      </div>
      <label class="col-md-2 offset-md-2 text-end p-2">정렬방식</label>
      <div class="col-md-2">
        <select class="searchSort form-select">
          <option selected>기본</option>
          <option value="1">성적순</option>
          <option value="2">이름순</option>
        </select>
      </div>
    </div><!--------------------searchAndSelect 종료----------------------->
    <!--여기부터 목록-->
    <div>

      <table class="studentTable table table-striped table-hover m-3 text-center m-auto">
        <thead>
          <tr class="colColor">
            <th scope="col">학번</th>
            <th scope="col">이름</th>
            <th scope="col">국어</th>
            <th scope="col">영어</th>
            <th scope="col">수학</th>
            <th scope="col">총점</th>
            <th scope="col">평균</th>
            <th scope="col">순위</th>
          </tr>
        </thead>
        <tbody id="tableRow">
          <!-- <tr> -->
          <!-- <th scope="row">1</th>
            <td>바나나</td>
            <td>95</td>
            <td>80</td>
            <td>70</td>
            <td>245</td>
            <td>81.7</td>
            <td></td> -->
          <!-- </tr> -->
          <!-- <tr> -->
          <!-- <th scope="row">2</th>
            <td>복숭아</td>
            <td>75</td>
            <td>60</td>
            <td>80</td>
            <td>215</td>
            <td>71.7</td>
            <td></td> -->
          <!-- </tr> -->
          <!-- <tr> -->
          <!-- <th scope="row">3</th>
            <td>토마토</td>
            <td>55</td>
            <td>90</td>
            <td>40</td>
            <td>185</td>
            <td>61.7</td>
            <td></td> -->
          <!-- </tr> -->
          <!-- <tr> -->
          <!-- <th scope="row">4</th>
            <td>천혜향</td>
            <td>30</td>
            <td>55</td>
            <td>100</td>
            <td>185</td>
            <td>61.7</td>
            <td></td> -->
          <!-- </tr> -->
          <!-- <tr> -->
          <!-- <th scope="row">5</th>
            <td>한라봉</td>
            <td>31</td>
            <td>57</td>
            <td>65</td>
            <td>153</td>
            <td>51</td>
            <td></td> -->
          <!-- </tr> -->
          <!-- <tr> -->
          <!-- <th scope="row">6</th>
            <td>꿀사과</td>
            <td>90</td>
            <td>75</td>
            <td>100</td>
            <td>265</td>
            <td>88.3</td>
            <td></td> -->
          <!-- </tr> -->
          <!-- <tr> -->
          <!-- <th scope="row">7</th>
            <td>나주배</td>
            <td>63</td>
            <td>77</td>
            <td>89</td>
            <td>229</td>
            <td>76.3</td>
            <td></td> -->
          <!-- </tr> -->
        </tbody>
      </table>
    </div>
    <!--페이지 순서요소-->
    <!-- <div> -->
    <!-- <nav class="pageChangeBT">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#">이전</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">다음</a>
        </li>
      </ul>
    </nav> -->
    <!-- </div> -->
  </section>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
    crossorigin="anonymous"></script>
  <!-- <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> -->
</body>

</html>