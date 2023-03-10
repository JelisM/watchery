//import './LineItem.css';
export default function LineItem({ lineItem, isPaid, handleChangeQty }) {
    return (
      <div className="LineItem">
        <div className="flex-ctr-ctr">{lineItem.watch.images[0]}</div>
        <div className="flex-ctr-ctr flex-col">
          <span className="align-ctr">{lineItem.watch.name}</span>
          <span>{lineItem.watch.price.toFixed(2)}</span>
        </div>
        <div className="qty" style={{ justifyContent: isPaid && 'center' }}>
          {!isPaid &&
            <button
              className="btn-xs"
              onClick={() => handleChangeQty(lineItem.watch._id, lineItem.qty - 1)}
            >−</button>
          }
          <span>{lineItem.qty}</span>
          {!isPaid &&
            <button
              className="btn-xs"
              onClick={() => handleChangeQty(lineItem.watch._id, lineItem.qty + 1)}
            >+</button>
          }
        </div>
        <div className="ext-price">${lineItem.extPrice.toFixed(2)}</div>
      </div>
    );
  }