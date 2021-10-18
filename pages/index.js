import Head from 'next/head'
import Image from 'next/image'
import MangaOnList from '../components/MangaOnList'
import MasterList from '../data/Masterlist.json'
import Options from '../components/Options'
import Sorting from '../components/Sorting'
import { useEffect, useRef, useState } from 'react'
import MangaDetails from '../components/MangaDetails'
import CurrentPage from '../components/CurrentPage'

export default function Home() {
  const myRef = useRef(null)
  function scrollToList(){
    myRef.current.scrollIntoView()
  }
  //search
  const [search, setSearch] = useState('')
  //filters
  const [currentTags, setCurrentTags] = useState([])
  const [currentGenres, setCurrentGenres] = useState([])
  const [origins, setOrigins] = useState([])
  const [currentStatus,setCurrentStatus] = useState([])
  //Sorting
  const [sortType, setSortType] = useState(-1)

  const [list, setList] = useState(MasterList)
  const [currentPage, setCurrentPage] = useState(1)
  const [showDetails,setShowDetails] = useState(false)
  const [mangaToShow, setMangaToShow] = useState(null)

  useEffect(()=>{
    sortList(2)
  },[])

  let numberOfPages = 1

  function showManga(manga){
    setMangaToShow(manga)
    setShowDetails(true)
  }
  function closeDetails(){
    setShowDetails(false)
  }

  //Filters
  function handleSearch(e){
    setSearch(e.target.value)
    setCurrentPage(1)
  }
  function addTag(tag){
    setCurrentTags(prev=>{
      const newArray = [...prev]
      newArray.push(tag)
      return newArray
    })
    setCurrentPage(1)
  }
  function removeTag(tag){
    setCurrentTags(prev=>{
      const newArray = [...prev]
      let index = newArray.findIndex(item=> item === tag)
      newArray.splice(index,1)
      return newArray
    })
    setCurrentPage(1)
  }
  function addGenre(genre){
    setCurrentGenres(prev=>{
      const newArray = [...prev]
      newArray.push(genre)
      return newArray
    })
    setCurrentPage(1)
  }
  function removeGenre(genre){
    setCurrentGenres(prev=>{
      const newArray = [...prev]
      let index = newArray.findIndex(item=> item === genre)
      newArray.splice(index,1)
      return newArray
    })
    setCurrentPage(1)
  }
  function addOrigin(origin){
    setOrigins(prev=>{
      const newArray =[...prev]
      newArray.push(origin)
      return newArray
    })
    setCurrentPage(1)
  }
  function removeOrigin(origin){
    setOrigins(prev=>{
      const newArray= [...prev]
      let index = newArray.findIndex(item=> item === origin)
      newArray.splice(index,1)
      return newArray
    })
    setCurrentPage(1)
  }
  function addStatus(status){
    setCurrentStatus(prev=>{
      const newArray =[...prev]
      newArray.push(status)
      return newArray
    })
    setCurrentPage(1)
  }
  function removeStatus(status){
    setCurrentStatus(prev=>{
      const newArray= [...prev]
      let index = newArray.findIndex(item=> item === status)
      newArray.splice(index,1)
      return newArray
    })
    setCurrentPage(1)
  }
  //Sorting
  function sortList(type){
    setList(prev=>{
      let newArray = [...prev]
      switch(type){
        case 0:
          newArray = AtoZ(newArray)
          break;
        case 1:
          newArray = ZtoA(newArray)
          break;
        case 2:
          newArray = [...MasterList].reverse()
          break;
        case 3:
          newArray = newest(newArray)
          break;
        case 4:
          newArray = oldest(newArray)
          break;
        default:
          break
      }
      return newArray
    })
    setSortType(type)
    setCurrentPage(1)
  }
  function setPages(arrayLength){
    numberOfPages = (Math.trunc(arrayLength/50))+1
  }
  function changePage(number){
    setCurrentPage(number)
    scrollToList()
  }


  return (
    <div className='page-container'>
      <Head>
        <title>r/otomeIsekai Masterlist</title>
        <meta name="otomeIsekai Masterlist" content="otomeIsekai Masterlist web version" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 style={{margin:'20px 0'}}>r/otomeIsekai Masterlist</h2>
      <Options search={handleSearch} searchValue={search} currentTags={currentTags} currentOrigins={origins} currentStatus={currentStatus} addTag={addTag} removeTag={removeTag}
        addOrigin={addOrigin} removeOrigin={removeOrigin} addStatus={addStatus} removeStatus={removeStatus}
        addGenre={addGenre} removeGenre={removeGenre} currentGenres={currentGenres}
        />
      <Sorting currentSort={sortType} sort={sortList}/>

      <div className='list-container' ref={myRef}>
          {list.filter(item=> filterSearch(item,search))
          .filter(item=> filterAll(item.tags,currentTags))
          .filter(item=> filterAll(item.genres,currentGenres))
          .filter(item=> filterOR(item.origin,origins))
          .filter(item=> filterOR(item.status,currentStatus))
          .filter((item,index,array)=>{
            if(index === 0){
              setPages(array.length)
           }
            return ((index >= 50*currentPage -50) && index < 50 * currentPage)})
          .map((item,index) => {
             return <MangaOnList key={item.title} data={item} asign={showManga}/>})}
      </div>
      <ul className='select-pages'>
            <li className='page'> {'<'} </li>
            {[...Array(numberOfPages)].map((item,index)=><CurrentPage key={index} value={index+1} change={changePage} current={currentPage}/>)}
            <li className='page'>{'>'}</li>
      </ul>
      {showDetails && <MangaDetails data={mangaToShow} close={closeDetails}/>}
      <footer className='footer-container'>
        <p>Made using a r/otomeIsekai Masterlist as a base, this is a simple project I made to practice React,NextJs</p>
        <p>Titles,Tags and Alternative names were extracted from the masterlist. The rest was fetched from Anilist on 10/10/12</p>
        <p><a href='https://github.com/ZelayaGonzalo/otomeIsekai-masterlist' target='_blank' rel='noreferrer noopener'>Go to Repository</a></p>
        
      </footer>
    </div>
  )
}
//Filter Functions
function filterSearch(item,value){
  if(item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) return true
  if(item.native_title){
    if(item.native_title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) return true
  }
  let flag = false
  if(item.alt_titles && !flag){
    item.alt_titles.forEach(name=>{
      if(name.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {flag= true}
    })
  }
  return flag
}

function filterOR(item,filters){
  let flag = false
  if(filters.length === 0){
    return true
  }
  if(!flag && filters.length > 0){
    filters.forEach(tag=>{
      if(item){
        if(item.includes(tag)){
          flag = true
        }
      }
    })
  }
  return flag
}

function filterAll(item,filters){
  let flags= []
  if(filters.length > 0){
    if(!item){
      return false
    }
    for( let i=0; i<filters.length;i++){
      flags.push(false)
    }
    filters.forEach((filterSingle,index)=>{
      if(item.includes(filterSingle)){
        flags[index] = true
      }
    })
    if(flags.every(value => value === true)) return true
    return false
  }
  return true
}

//Sorting Functions
function AtoZ(list){
  return (list.sort(function (a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }))
}
function ZtoA(list){
  return (list.sort(function (a, b) {
    if (a.title < b.title) {
      return 1;
    }
    if (a.title > b.title) {
      return -1;
    }
    return 0;
  }))
}
function newest(list){
  return (list.sort(function (a, b) {
    let aDate= getDate(a)
    let bDate= getDate(b)
    if(aDate instanceof Date && bDate instanceof Date){
      if (aDate.getTime() < bDate.getTime()) {
        return 1;
      }
      if (aDate.getTime() > bDate.getTime()) {
        return -1;
      }
      return 0;
    }
    else if ((aDate instanceof Date) && !(bDate instanceof Date)){
      return -1
    }
    else if (!(aDate instanceof Date) && (bDate instanceof Date)){
      return 1
    }
    else return 0
  }))
}
function oldest(list){
  return(newest(list).reverse())
}
function added(list){
  return list.reverse()
}


function getDate(item){
  
  if(item.anilist != {} && item.startDate){
    return new Date(`${item.startDate.year || 2000}-${item.startDate.month || 1}-${item.startDate.day || 1}`)
  } 
  return 0
}

