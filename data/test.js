import MasterList from './Masterlist.json'

export default function Test(){
    return(
        <div className='test'>
            Test
        </div>
    )
}

function getAllTags(list){
    const tags =[]
    list.forEach(item=>{
        if(item.tags){
            item.tags.forEach(name=>{
                if(!tags.includes(name)){
                    tags.push(name)
                }
            })
        }
    })
    export2txt(tags)
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