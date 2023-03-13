import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import "./NoteDetailPage.css"
import * as listItemsAPI from "../../utilities/listItems-api"

export default function NoteDetailPage({ listItems, deleteListItem, setListItems }) {
    const { id } = useParams();
    const [listItem, setListItem] = useState(null);
    const [editDetailsBtn, setEditDetailsBtn] = useState(false);
    const [detailsFormData, setDetailsFormData] = useState({
        listItemDate: '',
        listItemNote: '',
        listItemTitle: '',
       
        
    
    });

    useEffect(function () {
        const listItem = listItems.find(item => item._id === id);
        setListItem(listItem);
        if (!listItem) return;
        const { listItemTitle, listItemDate, listItemNote } = listItem;
        setDetailsFormData({ listItemTitle, listItemDate, listItemNote })
    }, [id, listItems])

    if (!listItem) return null

    function handleEditDetailsChange(evt) {
        setDetailsFormData({ ...detailsFormData, [evt.target.name]: evt.target.value })
    }

    async function handleEditDetailsSubmit(evt) {
        evt.preventDefault();
        const updatedListItem = await listItemsAPI.edit(listItem._id, detailsFormData);
        const listItemIdx = listItems.findIndex(item => item._id === updatedListItem._id)
        const itemsCopy = [...listItems]
        itemsCopy.splice(listItemIdx, 1, updatedListItem)
        setListItems(itemsCopy);
        setEditDetailsBtn(false);
    }

    return (
        <main className="details-page">
            <form className="details-page-form" onSubmit={handleEditDetailsSubmit} >
                <div className="what">
                    <h1 className="what-title">What:</h1>
                    {!editDetailsBtn ?
                        <div className="detail-text">
                            <p className="what-detail-text scroll">{listItem.listItemTitle}</p>
                        </div>
                        :
                        <textarea
                            type="text"
                            value={detailsFormData.listItemTitle}
                            name="listItemTitle"
                            onChange={handleEditDetailsChange}
                            className="details-input"
                        />
                    }
                </div>
               
                <div className="when">
                    <h3 className="details-title">When:</h3>
                    {!editDetailsBtn ?
                        <div className="detail-text">
                            <p className="scroll">{listItem.listItemDate}</p>
                        </div>
                        :
                        <textarea
                            type="text"
                            value={detailsFormData.listItemDate}
                            name="listItemDate"
                            onChange={handleEditDetailsChange}
                            placeholder="No date added yet"
                            className="details-input"
                        />
                    }
                </div>
                
                <div className="note">
                    <h4>Notes:</h4>
                    {!editDetailsBtn ?
                        <div className="detail-text">
                            <p className="scroll">{listItem.listItemNote}</p>
                        </div>
                        :
                        <textarea
                            type="text"
                            value={detailsFormData.listItemNote}
                            name="listItemNote"
                            onChange={handleEditDetailsChange}
                            className="details-input"
                        />
                    }
                </div>
                
                <br />
                <div>
                    {editDetailsBtn && <button className="submit-details-change" type="submit">SUBMIT</button>}
                </div>
            </form>
            <div className="edit-and-delete-btns">
                <button className="edit-details-btn" onClick={() => setEditDetailsBtn(!editDetailsBtn)} >
                    <img className="edit-details-icon"  alt="Edit" />
                </button>
                <Link to='/yourlist'>
                    <button className="delete-details-btn" onClick={() => deleteListItem(listItem._id)}>
                        <img className="delete-details-icon"  alt="Delete" />
                    </button>
                </Link>
            </div>
        </main >
    )
}