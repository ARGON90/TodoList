import { SyntheticEvent } from "react";

type BoardProps = {
  id: string;
  className: string;
  children: React.ReactNode;
}

function Board({id, className, children}: BoardProps) {
  const drop = (e: any) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id)!;
    card.style.display = "block";
    e.target.appendChild(card);
  };

  const dragOver = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div
      id={id}
      className={className}
      onDrop={drop}
      onDragOver={dragOver}
    >
      {children}
    </div>
  );
}

export default Board;
