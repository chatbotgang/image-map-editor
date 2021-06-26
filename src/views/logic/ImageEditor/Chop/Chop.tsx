export const CreateChopSelection = () => {
  return (
    <div className="drag-elements">
      <div className="drag-bar ord-n" data-ord="n"></div>
      <div className="drag-bar ord-e" data-ord="e"></div>
      <div className="drag-bar ord-s" data-ord="s"></div>
      <div className="drag-bar ord-w" data-ord="w"></div>

      <div className="drag-point ord-nw" data-ord="nw"></div>
      <div className="drag-point ord-n" data-ord="n"></div>
      <div className="drag-point ord-ne" data-ord="ne"></div>
      <div className="drag-point ord-e" data-ord="e"></div>
      <div className="drag-point ord-se" data-ord="se"></div>
      <div className="drag-point ord-s" data-ord="s"></div>
      <div className="drag-point ord-sw" data-ord="sw"></div>
      <div className="drag-point ord-w" data-ord="w"></div>
      <button>Remove</button>
    </div>
  );
};
