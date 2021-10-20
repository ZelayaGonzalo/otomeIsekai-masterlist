export default function Sorting(props){
    function checkType(int){
        return props.currentSort === int
    }
    return(
        <div className='sorting-container'>
            <ul className='sorting-options'>
                <li className={checkType(2) ? 'selected sort-unit': 'sort-unit'} onClick={()=>props.sort(2)}>Last Added</li>
                <li className={checkType(0) ? 'selected sort-unit': 'sort-unit'} onClick={()=>props.sort(0)}>A..Z</li>
                <li className={checkType(1) ? 'selected sort-unit': 'sort-unit'} onClick={()=>props.sort(1)}>Z..A</li>
                <li className={checkType(3) ? 'selected sort-unit': 'sort-unit'} onClick={()=>props.sort(3)}>Newest</li>
                <li className={checkType(4) ? 'selected sort-unit': 'sort-unit'} onClick={()=>props.sort(4)}>Oldest</li>
            </ul>
        </div>
    )
}

