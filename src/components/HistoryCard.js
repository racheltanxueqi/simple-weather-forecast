import {IconButton} from "../components/IconButton"
import "./HistoryCard.css";
import { formatDateTime } from "../utils/helper/formatDate";
import { FaSearch, FaTrash } from "react-icons/fa";

const HistoryCard = ({history,handleSearchClick, removeHistoryItem}) => {

    const renderHistoryRow = (item, index) => {
        return (<div className="history-row">
            <p>{item.city}, {item.country}</p>
            <div className="history-row-actions">
                <p style={{marginRight: '2px'}}>{formatDateTime(item.createdAt)}</p>
                <IconButton type="button" alt="search-icon" Icon={FaSearch} onClick={() => handleSearchClick({city: item.city, country: item.country, createdAt: new Date()})}/>
                <IconButton type="button" alt="delete-icon" Icon={FaTrash} onClick={() => removeHistoryItem(index)}/>
            </div>
        </div>)
    }

    return (
        <div className="history-card">
            <p>Search History</p>
            {history.map((item, index) => 
                renderHistoryRow(item, index)
            
            )}
        </div>
    )
}

export default HistoryCard