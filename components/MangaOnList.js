import ClampLines from 'react-clamp-lines';

export default function MangaOnList(props){

    return (
        <div className='manga-simple'>
            <div>
                <div onClick={()=>props.asign(props.data)} className='manga-list-img' style={{backgroundImage:`url(${props.data.cover && props.data.cover})`}}>
                </div>
                <ClampLines text={props.data.title} lines={2} ellipsis='...' buttons={false}/>
            </div>
            
        </div>
    )
}