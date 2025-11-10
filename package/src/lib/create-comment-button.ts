export type Cordinates = {
  x: number;
  y: number;
};
export const createCommentButton = (cordinates: Cordinates) => {
  if (cordinates?.x && cordinates?.y) {
    const dialogEl = document.createElement("div");
    dialogEl.style.height = "40px";
    dialogEl.style.position = "absolute";
    dialogEl.style.width = "40px";
    dialogEl.style.borderRadius = "100px";
    dialogEl.style.backgroundColor = "red";
    dialogEl.style.top = `${cordinates.y}px`;
    dialogEl.style.left = `${cordinates.x}px`;
    document.body.appendChild(dialogEl);
  }
};
