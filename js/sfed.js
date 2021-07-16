"use strict";
var sfed = {};

sfed.addStyle = function (sel, prop, val) {
  sfed.styleElements(sfed.getElements(sel), prop, val);
};
sfed.styleElements = function (elements, prop, val) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {    
    sfed.styleElement(elements[i], prop, val);
  }
};
sfed.styleElement = function (element, prop, val) {
  element.style.setProperty(prop, val);
};

sfed.addClass = function (sel, name) {
  sfed.addClassElements(sfed.getElements(sel), name);
};
sfed.addClassElements = function (elements, name) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {
    sfed.addClassElement(elements[i], name);
  }
};
sfed.addClassElement = function (element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
};
sfed.removeClass = function (sel, name) {
  sfed.removeClassElements(sfed.getElements(sel), name);
};
sfed.removeClassElements = function (elements, name) {
  var i, l = elements.length, arr1, arr2, j;
  for (i = 0; i < l; i++) {
    sfed.removeClassElement(elements[i], name);
  }
};
sfed.removeClassElement = function (element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
};
sfed.getElements = function (id) {
  if (typeof id == "object") {
    return [id];
  } else {
    return document.querySelectorAll(id);
  }
};
sfed.filterHTML = function(id, sel, filter) {
  var a, b, c, i, ii, iii, hit;
  a = sfed.getElements(id);
  for (i = 0; i < a.length; i++) {
    b = a[i].querySelectorAll(sel);
    for (ii = 0; ii < b.length; ii++) {
      hit = 0;
      if (b[ii].firstElementChild.innerText.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
        hit = 1;
      }
      c = b[ii].firstElementChild.getElementsByTagName("*");
      for (iii = 0; iii < c.length; iii++) {
        if (c[iii].innerText.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          hit = 1;
        }
      }
      if (hit == 1) {
        b[ii].style.display = "";
      } else {
        b[ii].style.display = "none";
      }
    }
  }
};