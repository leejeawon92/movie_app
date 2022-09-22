
# 1. Summary (개요)
+ React에 대한 기본적인 지식습득과 API를 통해 받아온 데이터를 컴포넌트를 통해 화면에 랜더링하는 방법을 배우고자 시작하게되었다.


# 2. Goal (목표)
* 전체 영화리스트를 보여주고 각 영화를 클릭했을때 상세영화설명을 볼 수 있는 애플리케이션을 React를 사용하여 만들고자 한다.  




# 3. Requirements (요구사항)
1. 영화 API를 사용하여 영화리스트 페이지 구현
    * yts에서 제공하는 movie API를 사용하여 영화정보를 받아온다.

2. 영화를 클릭했을때 다른 페이지로 이동
    + 하나의 영화컴포넌트를 클릭했을때 상세정보컴포넌트로 이동시킨다. 





# 4. Develop (개발)
### 1). 과정
* **Step1: API 사용하기**
```javascript
  const [loading,setLoading] = useState(true);
  const [movies,setMovies] = useState([]);
  const getMovies = async () => {
   const response= await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`);
   const json = await response.json();
   setMovies(json.data.movies);
   setLoading(false);
  }
  useEffect(()=>{
   getMovies();
  },[])

// https://yts.mx/api 에서 제공하는 API를 사용하여 Data를 받아온다. 
```

```javascript
  return (
   <div>
    {loading 
     ? <h1>Loading.....</h1>
     : <div>{movies.map((movie) => (
       <div key={movie.id}>
        <img src={movie.medium_cover_image} />
        <h1>{movie.title}</h1>
        <p>{movie.summary}</p>
        <ul>
         {movie.genres.map((g) => <li key={g}>{g}</li>)}
        </ul>
       </div>
     ))}</div>
    }
   </div>
  )
// 받아온데이터를 간단하게 랜더링 해본다.
```



* **Step2- 컴포넌트 분할**
```javascript
// Home.js
 return(
   <div>
    {loading 
     ? <h1>Loading.....</h1>
     : <div>
       {movies.map((movie) => 
          <Movie key={movie.id}
             medium_cover_image={movie.medium_cover_image} 
             title={movie.title} 
             summary={movie.summary} 
             genres={movie.genres} 
              />)}
      </div>
    }
   </div>
 );

// Home컴포넌트는 처음 접속하였을때  전체 영화리스트를 볼 수 있다.
```

```javascript
// Movie.js
function Movie({medium_cover_image, title, summary, genres}){
   return (
   <div>
     <img src={medium_cover_image} />
     <h1>{title}</h1>
     <p>{summary}</p>
     <ul>
       {genres.map((g) => <li key={g}>{g}</li>)}
     </ul>
   </div>)
}
// Movie컴포넌트는 영화와 관련된 정보만을 담고 있다.
```


```javascript
function Detail() {
   return <h1>Detail</h1>
}
// Detail컴포넌트는 Movie컴포넌트
```


* **Step3- React Router 추가**
```javascript
// App.js
import {BrowserRouter asRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (
   <Router>
    <Routes> 
     <Route path="/" element={<Home />} />
     <Route path="/movie/:id" element={<Detail />} />  
    </Routes>
   </Router>
 )
}

//  페이지를 전환하기 위해서 React Router를 사용하여 URL이 /이면 Home컴포넌트를 보여주고,  /movie/xxx 이면 Detail컴포넌트를 보여준다
// 동적URL을 사용하여 URL에 변수를 넣어 보낼 수 있게 하였다.
```

```javascript
// Home.js
<Movie  id={movie.id} />

// Movie컴포넌트에 movie.id를 보내야 Movie컴포넌트에서 각각의 movie에 Link를 걸 수 있을 것이다. 
```

```javascript
// Movie.js
<h1><Link to={`/movie/${id}`}>{title}</Link></h1>

// 각각의 Movie에 Link를 걸어서 클릭하면 해당하는 /movie/xxx URL로 이동되고 Detail컴포넌트가 보여질 것이다.
```



```javascript
// Detail.js
function Detail() {
   const {id} = useParams();
   const getMovie = async() => {
     const json= await(await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json()
     console.log(json);
   }
   useEffect(() => {
     getMovie();
   },[])
   return <h1>Detail</h1>
}

// useParams Hook을 사용하여 동적URL의 변수를 받아올 수 있다.
```


* Step4- Style추가 및 Publishing



### 2). 문제발생과 해결
#### Case1. async ~ await 구문의 잘못된 사용으로 인한 문제발생
* API를 통해 data를 받고 다시 json으로 변환하는 과정에서 await를 작성하지 않아 data를 받아오는데 undefined가 발생하는 문제가 발생하였습니다.
    * API를통해 받아온 데이터와 json을 하나의 코드를 사용함을써 실수를 줄이고자 한다. 
    
 

#### Case2. React Router 적용시 id전달을 하지 않아 문제 발생
* Home컴포넌트에서 Movie컴포넌트를 사용할때 id={movie.id} 를 적지 않아 Movie컴포넌트에서 id를 받지 못하는 상황이 발생하였다.
    * Movie컴포넌트에서 id값이 undefined인것을 보고 Home컴포넌트에서 Movie컴포넌트로 값을 전달하는 부분에 문제가 발생했다고 생각하여 확인함으로써 문제를 해결하였다


### 3). 보안점
* async await 구문에 대한 숙달 부족으로 인해 다양한 API호출해 봄으로서 숙달 능력을 키웠다
    * [mdn:async~await 설명](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)
    * [async~await 사용예제](https://joshua1988.github.io/web-development/javascript/js-async-await/)
* React Router사용시 prop로 값을 전달되는 부분과 받는 부분 확인이 필요함을 느꼈다. 



# 5. Learned (배운것)
- React에서 기본문법인 useState, useEffect, props에 대해서 배웠다. 
- useParams를 사용하여 동적URL의 변수를 받아올 수 있었다.
- React Router를 사용하여 페이지를 전환하는 방법을 배웠다.




# 6. Result (결과)
![movieApp_sample](https://user-images.githubusercontent.com/73148498/191717201-2b56d92f-4c77-4562-8a00-d9c9f5f4f1ab.PNG)





# 7. Relase Note

|버전|내용|날짜|
|------|---|---|
|v1.0.0|React 컴포넌트를 사용하여 영화리스트 애플리케이션 완성 </br> --Skill: useEffect/  useState /  useParams </br> --Tool: create-react-app/ react-router-dom    |2022.01.22|
