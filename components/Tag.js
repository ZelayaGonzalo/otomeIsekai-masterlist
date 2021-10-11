import { useState } from "react"

export default function Tag(props){
    const [checked,setChecked] = useState(props.currentTags.includes(props.name))
    function addOrRemove(){
        if(!checked){
            props.addTag(props.name)
        }
        else{
            props.removeTag(props.name)
        }
        setChecked(!checked)
    }
    return(
        <label className='tag-container'>
            <p>{props.name}</p>
            <input type='checkbox' checked={checked} onChange={addOrRemove}></input>
        </label>
    )
}