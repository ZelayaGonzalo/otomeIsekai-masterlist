export default function MangaDetails(props){
    let aninfo = ((props.data.anilist != {} ) && props.data.anilist) || null
    return(
        <div className='manga-details-container'>
            <div className='details-first-side'>
                <div className='details-image' style={{backgroundImage:`url(${props.data.anilist.coverImage && props.data.anilist.coverImage.extraLarge})`}}>
                </div>
                {(aninfo && aninfo.siteUrl) && <div className='details-links'>
                    <a href={aninfo.siteUrl} target="_blank" rel="noopener noreferrer" className='pink-btn details-link'>
                        Anilist
                    </a>
                    {aninfo.externalLinks.map(link => (<a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className='pink-btn details-link'>{link.site}</a>))}
                </div>}
            </div>
            <div className='details-info'>
                <div className='top'>
                    <h2 className='details-title'>
                        {props.data.title}
                    </h2>
                    <h4 className='details-title'>
                        {aninfo.title && aninfo.title.native}
                    </h4>
                    <div className='alt-titles'>
                        {props.data.altNames && props.data.altNames.map(title=> <p key={title}>{title}</p>)}
                    </div>
                    {props.data.tags && <ul className='tags-list'>
                        {props.data.tags.map(tag=><li key={tag+props.data.title} className='tag'>{tag},</li>)}
                    </ul>}
                    {aninfo!={} &&
                        <div className='manga-details-small'>
                            <p>{aninfo.startDate && `Release Date: ${aninfo.startDate.day}/${aninfo.startDate.month}/${aninfo.startDate.year}`}</p>
                            <p>Status: {aninfo.status}</p>
                            <p>Licensed: {aninfo.isLicensed ? 'Yes': 'No'}</p>
                        </div>
                    }
                </div>
                <div className='details-description'>
                    {pickDescription(props.data)}
                </div>
                <div className='rec'>
                    Recomended by: {props.data.rec}
                </div>
            </div>
            <div onClick={props.close} className='close-details'>
                Close
            </div>
        </div>
    )
}

function pickDescription(item){
    if(item.anilist.description){
        return <div dangerouslySetInnerHTML={{__html: item.anilist.description }}></div>
    }
    else if(item.description){
        return item.description
    }
    else return ''
}