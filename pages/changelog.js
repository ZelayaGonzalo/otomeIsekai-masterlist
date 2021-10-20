import updates from '../data/lastUpdates.json'
export default function Changelog(){
    return(
        <div className='changelog-container'>
            {updates.map(update=>
                <div key={update.date} className='update-container'>
                    <h2>{update.date}</h2>
                    <h3>Added:</h3>
                    <div className='updates-list '>
                    {update.updates.map(titles=>
                        <p key={titles}>{titles}</p>
                    )}
                    </div>
                    {update.fixed &&
                    <div>
                    <h3>Fixed:</h3>
                    <div className='updates-list '>
                    {update.fixed.map(titles=>
                        <p key={titles}>{titles}</p>
                    )}
                    </div>
                    </div>
                    }
                </div>
            )}
        </div>
    )
}