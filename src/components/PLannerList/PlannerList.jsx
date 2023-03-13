import { useState } from "react"
import ListItem from "../ListItem/ListItem"
import "./PlannerList.css"

export default function PlannerList({
    listItems,
    setListItems,
    addListItem,
    deleteListItem,
}) {

    const [listItemInfo, setListItemInfo] = useState({
        listItemTitle: ''
    })

    const notDoneYet = listItems.filter((ndy) => ndy.completed === false)
    const listTitles = notDoneYet.map(
        (l, idx) => <ListItem
            key={idx}
            listItem={l}
            listItems={listItems}
            setListItems={setListItems}
            deleteListItem={deleteListItem}
        />
    )

    function handleAddChange(evt) {
        setListItemInfo({ listItemTitle: evt.target.value })
    }

    function handleAddSubmit(evt) {
        evt.preventDefault();
        addListItem(listItemInfo);
        setListItemInfo({ listItemTitle: '' })
    }

    return (
        <>
            {listTitles.length ?
                <>
                    <div className="planner-list-items">
                        {listTitles}
                    </div>
                    <br />
                </>
                :
                <p className="no-items">Create Your List!</p>
            }
            <div className="add-one">
                <h3>
                    ADD Plan
                </h3>
                <form onSubmit={handleAddSubmit} className="add-to-list-form">
                    <input
                        type="text"
                        value={listItemInfo.listItemTitle}
                        name="listItemTitle"
                        onChange={handleAddChange}
                        required
                    />
                    <br />
                    <button className="add-list-item-btn">ADD</button>
                </form>
            </div>
        </>
    )
}