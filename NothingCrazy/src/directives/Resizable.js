import { debounce } from "quasar";

var currX = null;
var colCurrentWidth = null;
var upListener = null;
var moveListener = null;
var colToResize = null;
var resizingColIndex = null;
var currentTable = null;
var clickCounter = 0;
var debouncer = null;

function onMouseDown(e) {
  e.stopPropagation();
  e.preventDefault();
  currentTable = e.srcElement.closest("table");


  currX = e.x;
  colCurrentWidth = e.srcElement.parentElement.offsetWidth;
  colToResize = e.srcElement.parentElement;

  resizingColIndex = colToResize.cellIndex;

  if (clickCounter >= 1) {
    onMouseMove(e, colToResize.intialStyles);
  }

  upListener = (e) => onMouseUp(e);
  moveListener = (e) => onMouseMove(e);

  document.addEventListener("mouseup", upListener);
  document.addEventListener("mousemove", moveListener);

  clickCounter++;
  setTimeout(function () {
    clickCounter = 0;
  }, 500);

  return false;
}

function onMouseMove(e, resetStyles) {
  clickCounter = 0;
  let diffX = e.x - currX;
  var newWidth = colCurrentWidth + diffX;
  let rows = currentTable.querySelector("tbody").children;
  let cssText = resetStyles ? resetStyles : `position:relative;  overflow:hidden !important;
                                             width: ${newWidth}px !important;
                                             max-width: ${newWidth}px !important;
                                             min-width: ${newWidth}px !important;`;

  var header = currentTable.querySelector("thead tr").children[resizingColIndex];

  if (!header.hasAttribute("skip-resize")) {
    header.style.cssText = cssText;
  }
}

function onMouseUp(e) {
  e.stopPropagation();
  e.preventDefault();
  document.removeEventListener("mouseup", upListener);
  document.removeEventListener("mousemove", moveListener);

  return false;
}

function addSlider(el) {
  var slider = document.createElement("div");

  slider.style.cssText = `position: absolute;
                          border-left: 2px solid rgba(12,12,12,.0);
                          cursor: col-resize;
                          left: auto;
                          right: 0;
                          z-index: 5;
                          height: 100%;
                          top: 0;`;

  let width = el.offsetWidth;
  el.style.cssText = width === 0 ? el.intialStyles : `position:relative;
                           overflow:hidden !important;
                           width: ${width}px !important;
                           max-width: ${width}px !important;
                           min-width: ${width}px !important;`;

  el.intialStyles = el.style.cssText;
  slider.addEventListener("mousedown", onMouseDown);
  slider.addEventListener("click", function (e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
    return false;
  });

  el.appendChild(slider);
}

function configureTable(qTable) {
  console.log("configur table");
  var table = qTable.querySelector("table");
  console.log("tables", table);
  let headerRow = table.querySelector("thead tr");

  for (var x = 0; x < headerRow.children.length; x++) {
    let col = headerRow.children[x];
    if (col.hasAttribute("auto-width")) {
      continue;
    }
    addSlider(col);
  }
}

export default {
  created(el, binding, vnode, prevVnode) {

  },
  beforeMount(el, binding, vnode, prevVnode) {

  },
  mounted(el, binding, vnode, prevVnode) {
    console.log("resize mounted", el);
    configureTable(el);
  },
  beforeUpdate(el, binding, vnode, prevVnode) {

  },
  updated(el, binding, vnode, prevVnode) {
    if (debouncer != null) clearTimeout(debouncer);
    debouncer = setTimeout(function () {
      configureTable(el);
    }, 0);

  },
  beforeUnmount(el, binding, vnode, prevVnode) {

  },
  unmounted(el, binding, vnode, prevVnode) {
    console.log("on unmount");
    document.removeEventListener("mouseup", upListener);
    document.removeEventListener("mousemove", moveListener);

    currX = null;
    colCurrentWidth = null;
    upListener = null;
    moveListener = null;
    colToResize = null;
    resizingColIndex = null;
    currentTable = null;
    clickCounter = 0;
  }
};
