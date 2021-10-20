export default function MangaDetails(props){
    return(
        <div className='manga-details-container'>
            <div className='details-first-side'>
                <div className='details-image' style={{backgroundImage:`url(${props.data.cover && props.data.cover})`}}>
                </div>
                {(props.data) && <div className='details-links'>
                   {props.data.url && <a href={props.data.url} target="_blank" rel="noopener noreferrer" className='pink-btn details-link'>
                        Anilist
                    </a>}
                    {props.data.externalLinks.map(link => (<a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className='pink-btn details-link'>{link.site}</a>))}
                </div>}
            </div>
            <div className='details-info'>
                <div className='top'>
                    <h2 className='details-title'>
                        {props.data.title}
                    </h2>
                    <h4 className='details-title'>
                        {props.data.native_title}
                    </h4>
                    <div className='alt-titles'>
                        {props.data.alt_titles && props.data.alt_titles.map(title=> <p key={title}>{title}</p>)}
                    </div>
                    {props.data.genres && <ul className='tags-list'>
                        {props.data.genres.map((genre,index)=><li key={genre+index} className='genre'>{genre}{(props.data.genres.length -1 !== index) &&','}</li>)}
                    </ul>}
                    {props.data.tags && <ul className='tags-list'>
                        {props.data.tags.map((tag,index)=>{
                            return <li key={tag} className='tag'>{tag}{(props.data.tags.length -1 !== index) &&','}</li>
                            })}
                    </ul>}
                    <div className='manga-details-small'>
                        <p>{props.data.startDate && `Release Date: ${props.data.startDate.day}/${props.data.startDate.month}/${props.data.startDate.year}`}</p>
                        <p>Status: {props.data.status}</p>
                        <p>Licensed: {props.data.isLicensed ? `Yes (${getSource(props.data)})`: 'No'}</p>
                    </div>
                </div>
                <div className='details-description'>
                    {pickDescription(props.data)}
                </div>
            </div>
            <div onClick={props.close} className='close-details'>
                Close
            </div>
        </div>
    )
}

function pickDescription(item){
    if(item.description){
        return <div dangerouslySetInnerHTML={{__html: item.description }}></div>
    }
    else if(item.description){
        return item.description
    }
    else return ''
}

function getSource(item){
    let source=''
    if(item.isLicensed){
       item.externalLinks.forEach(link=>{
            if((link.site === "Official Site" || link.site ==="Webtoons") && source===''){
                let url = new URL(link.url)
                if(url.hostname === 'm.wecomics.com'){
                    source='Wecomics'
                }
                else{
                    source=getHostName(link.url)
                }
            }
        })
    }
    if(source === 'sevenseasentertainment') source = 'Seven Seas'
    return source.charAt(0).toUpperCase() + source.slice(1);
}
function getHostName(url) {
	var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
	if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
		var hostname = match[2].split(".");
		return hostname[0];
	}
	else {
		return null;
	}
}
