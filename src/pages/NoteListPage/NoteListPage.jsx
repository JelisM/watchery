import SuggestionList from "../../components/SuggestionList/SuggestionList";
import PlannerList from "../../components/PLannerList/PlannerList";
import "./NoteListPage.css"

export default function NoteListPage({ 
  listItems, 
  getSuggestions, 
  setSuggestions, 
  addListItem, 
  deleteListItem, 
  setListItems,
  suggestions,
}) {

  return (
    <main className="notelist-page">
      <h1>YOUR LIST</h1>
      <div className="notelist-page-content">
        <div className="note-list-items">
          <PlannerList
            listItems={listItems}
            setListItems={setListItems}
            addListItem={addListItem}
            deleteListItem={deleteListItem}
          />
        </div>
        <div className="suggestions-with-title">
          <div className="suggestions">
          <h4 className="suggestions-title">Suggestions</h4>
          <button onClick={getSuggestions} className="suggestion-btn">
            <img src="https://i.imgur.com/6ABHHdz.png" alt="Shuffle Suggestions Icon" className="reverse-img-icon" />
          </button>
          </div>
          <SuggestionList suggestions={suggestions} addListItem={addListItem} setSuggestions={setSuggestions} />
        </div>
      </div>
    </main>
  );
}