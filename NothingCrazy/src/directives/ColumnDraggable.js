import { debounce } from "quasar";

export default {
  mounted(el, binding, vnode) {
    let upListener = null;
    let moveListener = null;
    let colToMove = null;
    let currentTable = null;
    let clickCounter = 0;
    let debouncer = null;
    let isDragging = false;
    let computedStyle = null;
    let blackLine = null;
    let initialColumnIndex = null;
    let finalColumnIndex = null;
    let clickOffsetX = 0;

    function cloneStyles(src, dest) {
      computedStyle = window.getComputedStyle(src);
      Array.from(computedStyle).forEach(key =>
        dest.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key))
      );

      const borderColor = computedStyle.getPropertyValue('border-left-color') || computedStyle.getPropertyValue('border-bottom-color');

      dest.style.borderTop = `1px solid ${borderColor}`;
      dest.style.borderRight = `1px solid ${borderColor}`;
    }

    function onMouseDown(e) {
      e.stopPropagation();
      e.preventDefault();
      currentTable = e.srcElement.closest("table");

      if (e.target.tagName.toLowerCase() === 'i')
        return;

      var element = e.target.tagName.toLowerCase() === 'th' ? e.target : e.target.parentNode;

      if (element.tagName.toLowerCase() === 'th') {
        isDragging = true;
        colToMove = document.createElement('div');
        const colToMoveHeader = element.cloneNode(true);
        cloneStyles(element, colToMoveHeader);
        colToMoveHeader.style.backgroundColor = '#f4f4f4'
        document.body.appendChild(colToMove);
        colToMove.appendChild(colToMoveHeader)
        colToMove.style.position = 'absolute';
        const rect = element.getBoundingClientRect();

        clickOffsetX = e.clientX - element.getBoundingClientRect().left;

        colToMove.style.top = `${rect.top + window.scrollY}px`;
        colToMove.style.left = `${rect.left}px`;
        colToMove.style.margin = '0';

        const gradientFade = `linear-gradient(to bottom, rgba(244, 244, 244, 1), rgba(255, 255, 255, 0))`;
        colToMove.style.background = gradientFade;

        const tableRows = currentTable.querySelector('tbody').rows;
        const columnIndex = Array.from(element.parentNode.children).indexOf(element);
        initialColumnIndex = columnIndex;

        for (let i = 0; i < Math.min(5, tableRows.length); i++) {
          const row = tableRows[i];
          const cell = row.cells[columnIndex];
          if (cell) {
            const rowClone = document.createElement('tr');
            const cellClone = cell.cloneNode(true);
            cloneStyles(cell, cellClone);

            rowClone.style.backgroundColor = `rgba(244, 244, 244, ${1 - (i + 1) * 0.2})`;
            rowClone.style.opacity = `${1 - (i + 1) * 0.2}`;
            rowClone.style.pointerEvents = 'none';

            rowClone.appendChild(cellClone);
            colToMove.appendChild(rowClone);
          }
        }

        blackLine = document.createElement('div');
        blackLine.style.position = 'absolute';
        blackLine.style.width = '2px';
        blackLine.style.height = `${currentTable.offsetHeight}px`;
        blackLine.style.backgroundColor = 'grey';
        document.body.appendChild(blackLine);

      }

      upListener = (e) => onMouseUp(e);
      moveListener = (e) => onMouseMove(e);

      document.addEventListener("mouseup", upListener);
      document.addEventListener("mousemove", moveListener);

      clickCounter++;
      setTimeout(function () { clickCounter = 0; }, 500);

      return false;
    }

    function onMouseMove(e, resetStyles) {
      clickCounter = 0;
      if (isDragging && colToMove) {
        const newLeft = e.clientX - clickOffsetX;

        colToMove.style.left = `${newLeft}px`;

        const headers = currentTable.querySelectorAll('thead th');
        let hoveredColumnIndex = null;

        headers.forEach((header, index) => {
          const rect = header.getBoundingClientRect();
          if (e.clientX >= rect.left && e.clientX < rect.right) {
            hoveredColumnIndex = index;
          }
        });

        finalColumnIndex = hoveredColumnIndex;

        if (hoveredColumnIndex !== null) {
          const hoveredHeader = headers[hoveredColumnIndex];
          const hoveredRect = hoveredHeader.getBoundingClientRect();
          const midPoint = (hoveredRect.left + hoveredRect.right) / 2;

          if (e.clientX > midPoint) {
            blackLine.style.left = `${hoveredRect.right}px`;
          } else {
            blackLine.style.left = `${hoveredRect.left}px`;
          }
          blackLine.style.top = `${hoveredRect.top + window.scrollY}px`;
        }

      }
    }

    function onMouseUp(e) {
      e.stopPropagation();
      e.preventDefault();

      isDragging = false;
      if (colToMove) {
        document.body.removeChild(colToMove);
        colToMove = null;
      }

      if (blackLine) {
        document.body.removeChild(blackLine);
        blackLine = null;
      }

      if (initialColumnIndex !== null && finalColumnIndex !== null) {
        const columnsToReorder = binding.value;

        const [movedColumn] = columnsToReorder.splice(initialColumnIndex, 1);
        columnsToReorder.splice(finalColumnIndex, 0, movedColumn);

        initialColumnIndex = null;
        finalColumnIndex = null;
      }

      document.removeEventListener("mouseup", upListener);
      document.removeEventListener("mousemove", moveListener);

      return false;
    }

    el.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  },

  unmounted(el, binding, vnode, prevVnode) {
    el.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener("mouseup", upListener);
    document.removeEventListener("mousemove", moveListener);

    upListener = null;
    moveListener = null;
    colToMove = null;
    currentTable = null;
    clickCounter = 0;
    debouncer = null;
    isDragging = false;
    computedStyle = null;
    blackLine = null;
    initialColumnIndex = null;
    finalColumnIndex = null;
  }
};
