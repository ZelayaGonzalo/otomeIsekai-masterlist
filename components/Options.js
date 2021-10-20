import { useState } from 'react'
import Tags from '../data/newTags.json'
import Tag from './Tag'
import Genres from '../data/Genres.json'

export default function Options(props){
    const tags = Tags.sort()
    const [showFilters, setShowFilters] = useState(false)
    function addOrRemoveOrigin(array){
        if(!checkOrigin(array)){
            props.addOrigin(array)
        }
        else{
            props.removeOrigin(array)
        }
    }
    function addOrRemoveStatus(array){
        if(!checkStatus(array)){
            props.addStatus(array)
        }
        else{
            props.removeStatus(array)
        }
    }
    function addOrRemoveGenre(string){
        if(!checkGenre(string)){
            props.addGenre(string)
        }
        else{
            props.removeGenre(string)
        }
    }
    function checkOrigin(stringToCheck){
        return props.currentOrigins.includes(stringToCheck)
    }
    function checkGenre(string){
        return props.currentGenres.includes(string)
    }
    function checkStatus(string){
        return props.currentStatus.includes(string)
    }
    return(
        <div className='options-container'>
            <div className='options-top'>
                <label className='search-container'>
                    <input placeholder='Search...' value={props.searchValue} onChange={props.search}></input>
                </label>
                <div className={showFilters ? 'option-filters' :'option-filters filter-selected'} onClick={()=>setShowFilters(!showFilters)}>
                    {!showFilters ? 'Show Filters' : 'Hide Filters'}
                </div>
            </div>
            {showFilters && 
                <div className='filters-container'>
                    <div className='tag-list-container'>
                        {tags.map(tag=><Tag key={tag} name={tag} addTag={props.addTag} removeTag={props.removeTag} currentTags={props.currentTags}/>)}
                    </div>
                    {
                        <ul className='origin-container'>
                            Genres:
                            {Genres.map(genre=><li key={genre} className={checkGenre(genre) ? 'origin-type selected': 'origin-type'} onClick={()=>addOrRemoveGenre(genre)}>{genre}</li>)}
                        </ul>
                    }
                    <ul className='origin-container'>
                        Type:
                        <li className={checkOrigin('JP') ? 'origin-type selected': 'origin-type'} onClick={()=>addOrRemoveOrigin('JP')}>Manga</li>
                        <li className={checkOrigin('KR') ? 'origin-type selected': 'origin-type'} onClick={()=>addOrRemoveOrigin('KR')}>Manwha</li>
                        <li className={checkOrigin('CN') ? 'origin-type selected': 'origin-type'} onClick={()=>addOrRemoveOrigin('CN')}>Manhua</li>
                    </ul>
                    <ul className='origin-container'>
                        Status:
                        <li className={checkStatus('RELEASING') ? 'origin-type selected': 'origin-type'} onClick={()=>addOrRemoveStatus('RELEASING')}>Releasing</li>
                        <li className={checkStatus('FINISHED') ? 'origin-type selected': 'origin-type'} onClick={()=>addOrRemoveStatus('FINISHED')}>Finished</li>
                        <li className={checkStatus('CANCELLED') ? 'origin-type selected': 'origin-type'} onClick={()=>addOrRemoveStatus('CANCELLED')}>Cancelled</li>
                    </ul>
                </div>}
        </div>
    )
}


