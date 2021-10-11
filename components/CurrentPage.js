export default function CurrentPage(props){
    return(
        <li className={props.current ===props.value ? 'page selected':'page'} onClick={()=>props.change(props.value)}>
            {props.value}
        </li>
    )
}