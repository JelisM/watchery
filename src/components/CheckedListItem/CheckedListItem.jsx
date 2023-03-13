import "./CheckedListItem.css"
import { Link } from "react-router-dom"

export default function CheckedListItem({ checkedItemObject }) {
    return (
        <div className="checked-item-with-checkbox">
            <input
                className="read-only-checkbox"
                type="checkbox"
                checked={true}
                readOnly
            />
            <div className="checked-list-item">
                <div className="checked-list-item">
                    <Link to={`/details/${checkedItemObject._id}`}>
                        <div className="checked-item-object">{checkedItemObject.listItemTitle}</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
