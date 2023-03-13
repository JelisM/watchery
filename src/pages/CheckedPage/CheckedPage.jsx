import { useState } from "react";
import CheckedListItem from "../../components/CheckedListItem/CheckedListItem";
import "./CheckedPage.css";

export default function CheckedPage({listItems}) {
    const [checkedItems, setCheckedItems] = useState(listItems.filter((chi) => chi.completed === true));

    const handleDelete = (id) => {
        setCheckedItems(prevCheckedItems => prevCheckedItems.filter(item => item.id !== id));
    };

    const checkedItemObjects = checkedItems.map((cio) => (
        <CheckedListItem 
            checkedItemObject={cio} 
            key={cio.id}
            handleDelete={handleDelete}
        />
    ));

    return (
        <main className="checked-page">
            <h1 className="checked-heading">DONE</h1>
            <div className="checked-items">
                {checkedItemObjects}
            </div>
        </main>
    );
}