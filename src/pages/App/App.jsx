import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import CheckedPage from '../CheckedPage/CheckedPage';
import NavBar from '../../components/NavBar/NavBar';
import NoteListPage from '../NoteListPage/NoteListPage';
import NoteDetailPage from '../NoteDetailPage/NoteDetailPage';
import * as suggestionsAPI from "../../utilities/suggestions-api"
import * as listItemsAPI from "../../utilities/listItems-api"

export default function App() {
  const [user, setUser] = useState(getUser());
  const [suggestions, setSuggestions] = useState([]);
  const [listItems, setListItems] = useState([]);

  async function getSuggestions() {
    const suggestions = await suggestionsAPI.getSuggestions();
    setSuggestions(suggestions)
  }

  async function addListItem(data) {
    console.log(data);
    const listItem = await listItemsAPI.create(data)
    const updatedList = [...listItems, listItem];
    updatedList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setListItems(updatedList)
  }

  async function deleteListItem(id) {
    const listItems = await listItemsAPI.remove(id);
    setListItems(listItems);
  }

  useEffect(() => {
    async function getListItems() {
      const allListItems = await listItemsAPI.getAllForUser();
      setListItems(allListItems);
    };
    if (user) getListItems();
  }, [user]
  )

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route 
                path="/checkedlist" 
                element={<NoteListPage 
                  listItems={listItems} 
                  getSuggestions={getSuggestions} 
                  setSuggestions={setSuggestions} 
                  addListItem={addListItem}
                  deleteListItem={deleteListItem}
                  setListItems={setListItems}
                  suggestions={suggestions}
                />}
              />
              <Route path="/checked" element={<CheckedPage listItems={listItems} />} />
              <Route 
                path="/details/:id" 
                element={<NoteDetailPage 
                  listItems={listItems} 
                  deleteListItem={deleteListItem}
                  setListItems={setListItems}
                />}
              />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}