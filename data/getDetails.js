import { useEffect } from 'react';
import MasterList from './Masterlist.json'

export default function GetDetails(){
    useEffect(()=>{
        addOrigin(611,MasterList.length -1,MasterList)
    },[])
    return(
        <div>
            Getting data...
        </div>
    )
}

async function addOrigin(start,end,array){
  var query = `
query ($id: Int, $search: String) {
    Media (id: $id, search: $search, type:MANGA) {
      id
      countryOfOrigin
    }
}
`;
  let variables={}
  const newArray = [...array]
  for(let i=start; i <= end ;i++){
    variables={
      id:newArray[i].id,
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
    const data = await fetch(url, options).then(handleResponse)
    .then(handleData)
    await console.log('newdata',data)
    if (data && data.data){
      newArray[i].origin =  data.data.Media.countryOfOrigin
    }
  }
  console.log(newArray)
  export2txt(newArray,end)
}


async function addDetails(start,end,array){
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
        averageScore
        favourites
        siteUrl
        externalLinks{
            id
            url
            site
        }
      }
  }
  `;
    const newArray = [...array]
    for(let i=start; i <= end ;i++){
        let title = ''
      if(newArray[i].useAlt){
        title = newArray[i].alt
      }
      else{
        title = newArray[i].title
      }
      console.log(title)
      let variables = {
        search: title,
      };
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
      const data = await fetch(url, options).then(handleResponse)
      .then(handleData)
      await console.log('newdata',data)
      newArray[i].anilist = (data && data.data) ? data.data.Media : {}
    }
    console.log(newArray)
    export2txt(newArray,end)
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
  
  function export2txt(data,end) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
      type: "text/plain"
    }));
    a.setAttribute("download", `upto${end}`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  