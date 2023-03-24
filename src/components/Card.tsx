import MuiCard from "./MuiCard";

type Card = {
  id: any;
  templateId: number;
  className: string,
  title: string,
  task: string;
  draggable: any;
  titleColor: string;
  backgroundColor: string;
  taskColor: string;
  borderColor: string;
  status: string;
  image: string;
  deleted: any;
}

function Card({
  id,
  templateId,
  className,
  draggable,
  titleColor,
  backgroundColor,
  taskColor,
  borderColor,
  title,
  task,
  status,
  image,
  deleted,
}: Card) {
  const dragStart = (e: any) => {
    const target = e.target;
    e.dataTransfer.setData("card_id", target.id);
    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  const dragEnd = (e: any) => {
    if (e.target.style.display === "none") {
      e.target.style.display = "block";
    }
  };

  const dragOver = (e: any) => {
    e.stopPropagation();
  };

  console.log(id)
  return (

    <>
    {deleted === true ? <div style= {{height: '0px', width: '0px' }}> </div>
    :
    <div
    id={id}
    className={className}
    draggable={draggable}
    onDragStart={dragStart}
    onDragOver={dragOver}
    onDragEnd={dragEnd}
  >
    <MuiCard todoId={id} templateId={templateId} title={title} titleColor={titleColor} taskColor={taskColor} borderColor={borderColor} backgroundColor={backgroundColor}  task={task} status={status} image={image} />
  </div>
     }
    </>
  );
}

export default Card;
