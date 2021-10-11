function onlineSpreadsheet(){
    const spreadsheetId = '1yl1JLz6jokSTHCTEaQ64h5lg4uwf1TWMq9p1jJdM4Fs'
    fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`)
    .then(res => res.text())
    .then(text => {
    const json = JSON.parse(text.substr(47).slice(0, -2))
    console.log(json)
  })
}

function processSheet(array){
    const newArray = array.map(item=>{
      const newItem = item.c
      return newItem
    })
    newArray.forEach(item=>{
     if(item[1]){
      const newList = (item[1].v).split(',')
  
      item[1].array = newList.map(word=>{
        const newWord = trimText(word)
        return newWord
      })
     }
     if(item[2]){
      const newList = (item[2].v).split(',')
      item[2].array = newList.map(word=>{
        const newWord = trimText(word)
        return newWord
      })
     }
    })
    const finalArray = newArray.map(item=>{
      const finalFormat ={
        title : item[0] && (item[0].v || null),
        description: item[6] && (item[6].v || null),
        altNames: item[1] && (item[1].array || null),
        tags: item[2] && (item[2].array || null) , 
        rec: item[3] && (item[3].v || null),
        notes: item[4] && (item[4].v || null)
      }
      return finalFormat
    })
    export2txt(finalArray)
  }
  
  function trimText(text){
    return text.trim()
  }
  
  
  function export2txt(data) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "data.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  

  //Fetch data from anilist 

  var query = `
query ($id: Int, $search: String) {
    Media (id: $id, search: $search, type:MANGA) {
      id
      status
      countryOfOrigin
      isLicensed
      description(asHtml:true)
      title {
        romaji
        english
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
    }
}
`;

var variables = {
  search: "Garden of Silence",
};

var url = 'https://graphql.anilist.co',
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

fetch(url, options).then(handleResponse)
                    .then(handleData)
                    .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}

async function addDetails(start,end,array){
    var query = `
  query ($id: Int, $search: String) {
      Media (id: $id, search: $search, type:MANGA) {
        id
        status
        countryOfOrigin
        isLicensed
        description(asHtml:true)
        title {
          romaji
          english
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
      }
  }
  `;
    const newArray = [...array]
    for(let i=start; i <= end ;i++){
      let variables = {
        search: newArray[i].title,
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