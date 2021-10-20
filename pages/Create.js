import { useState } from "react"
import { useForm } from "react-hook-form";
export default function NewFormat(){
  const [id, setId] = useState('')
  const { register, handleSubmit } = useForm();
  const onSubmit = data => createData(data);

  function handleId(e){
    setId(e.target.value)
  }
  function fetchAnilist(){
    addDetails(id)
  }
  return(    
      <div className='creator-container'>
        Fetch Data from anilist:
          <div className='fetch-anilist'>
            <input placeholder='Anilist id' value={id} onChange={handleId}/>
            <button onClick={fetchAnilist}>fetch</button>
          </div>
          <div className='fill-data'>
            Create Data
            <form onSubmit={handleSubmit(onSubmit)}> 
              <label>
                Title(req):
                <input {...register("title", { required: true })}/>
              </label>
              <label>
                Title (Native):
                <input {...register("native")}/>
              </label>
              <label>
                Description
                <textarea {...register("description")}>

                </textarea>
              </label>
              <label>
                Alt. titles:
                <input {...register("synonyms")}/>
              </label>
              <label>
                Tags:
                <input {...register("tags")}/>
              </label>
              <label>
                Genres:
                <input {...register("genres")}/>
              </label>
              <label>
                Cover(url):
                <input {...register("cover")}/>
              </label>
              <label>
                Type:
                <select {...register("origin")}>
                  <option value='JP'>Manga (Japan)</option>
                  <option value='KR'>Manwha (Korea)</option>
                  <option value='CN'>Manhua (China)</option>
                </select>
              </label>
              <label>
                Licensed:
                <input type='checkbox'{...register("licensed")}/>
              </label>
              <label>
                Status:
                <select {...register("status")}>
                  <option value='RELEASING'>Releasing</option>
                  <option value='FINISHED'>Finished</option>
                  <option value='CANCELLED'>Cancelled</option>
                </select>
              </label>
              <label>
                Start Date:
                <input type='date' {...register("date")}/>
              </label>
              <input type='submit'/>
            </form>
          </div>
      </div>
  )
}

function Convert(data){
    return {
        id: data.id,
        title:getTitle(data),
        title_anilist: getTitle(data),
        native_title:data.title.native,
        alt_titles:data.synonyms,
        description:data.description,
        tags:getTags(data.tags),
        genres:data.genres,
        status:data.status,
        isLicensed:data.isLicensed,
        startDate:data.startDate,
        cover:data.coverImage.extraLarge,
        url:data.siteUrl,
        externalLinks:data.externalLinks,
    }
}
function getTags(tags){
  const newTags=[]
  tags.forEach(tag=>{
    newTags.push(tag.name)
  })
  return newTags
}
function getTitle(data){
  if (data.title.english){
    return data.title.english
  }
  if(data.synonyms[0]){
    return data.synonyms[0]
  }
  return data.title.romaji
}

async function addDetails(id){
  var query = `
query ($id: Int, $search: String) {
    Media (id: $id, search: $search, type:MANGA) {
      id
      status
      countryOfOrigin
      isLicensed
      description
      title {
        romaji
        native
      }
      startDate{
        year
        month
        day
      }
      coverImage{
        extraLarge
      }
      siteUrl
      externalLinks{
          id
          url
          site
      }
      status
      countryOfOrigin
      isLicensed
      description
        genres
      synonyms
      tags {
        id
        name
      }
      title {
        english
        romaji
        native
      }
      startDate{
        year
        month
        day
      }
      coverImage{
        extraLarge
      }
      siteUrl
      externalLinks{
          id
          url
          site
      }
    }
}
`;
  let variables={
    id:id,
  }
  console.log(variables)
  let url = 'https://graphql.anilist.co',
  options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
          query: query,
          variables: variables
      })
  };
  let newData = 'empty'
  const data = await fetch(url, options).then(handleResponse)
  .then(handleData)
  .catch(handleError)
  await console.log('newdata',data)
  if (data && data.data){
    newData =  Convert(data.data.Media)
  }
  console.log(newData)
  export2txt(newData)
}



function handleResponse(response) {
  return response.json().then(function (json) {
      return response.ok ? json : {};
  });
}

function handleData(data) {
console.log(data)
  return data;
}

function handleError(error) {
  alert('Error, check console');
  console.error(error);
  return null
}

function export2txt(data) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
    type: "text/plain"
  }));
  a.setAttribute("download", `udata`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function createData(data){
  const newData={
        id: (Math.random()*100+Math.random()*10),
        title:data.title,
        title_anilist: data.title,
        native_title:data.native,
        origin:data.origin,
        alt_titles:separatebyComma(data.synonyms),
        description:data.description,
        tags:separatebyComma(data.tags),
        genres:separatebyComma(data.genres),
        status:data.status,
        isLicensed:data.isLicensed,
        startDate:getstartDate(data.date) || null,
        cover:data.cover,
        url:null,
        externalLinks:[],
  }
  export2txt(newData)
}
function separatebyComma(names){
  const array = names.split(",")
  const newArray=[]
  array.forEach(name=>{
    newArray.push(name.trim())
  })
  console.log(newArray)
  return newArray
}
function getstartDate(date){
  const currentDate= new Date(date)
  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth()+1,
    day: currentDate.getDate()
  }
}