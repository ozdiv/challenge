"use strict";
var sf = {};

sf.addStyle = function (sel, prop, val) {
  sf.styleElements(sf.getElements(sel), prop, val);
};
sf.styleElements = function (elements, prop, val) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {
    sf.styleElement(elements[i], prop, val);
  }
};
sf.styleElement = function (element, prop, val) {
  element.style.setProperty(prop, val);
};

sf.addClass = function (sel, name) {
  sf.addClassElements(sf.getElements(sel), name);
};
sf.addClassElements = function (elements, name) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {
    sf.addClassElement(elements[i], name);
  }
};
sf.addClassElement = function (element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
  }
};
sf.removeClass = function (sel, name) {
  sf.removeClassElements(sf.getElements(sel), name);
};
sf.removeClassElements = function (elements, name) {
  var i, l = elements.length, arr1, arr2, j;
  for (i = 0; i < l; i++) {
    sf.removeClassElement(elements[i], name);
  }
};
sf.removeClassElement = function (element, name) {
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
sf.getElements = function (id) {
  if (typeof id == "object") {
    return [id];
  } else {
    return document.querySelectorAll(id);
  }
};
sf.countCards = function () {
  setTimeout(
    function () {
      if (document.querySelectorAll('.madeIt').length === 0) {
        document.getElementById("noHit").innerHTML = `No results found for ${document.querySelector('.sf-input').value}`
      } 
      else if (document.querySelectorAll('.madeIt').length === 1) {
        document.getElementById("noHit").innerHTML = `Found ${document.querySelectorAll('.madeIt').length} result`
      }       
      else if (document.querySelectorAll('.madeIt').length === 12) {
        document.getElementById("noHit").innerHTML = ``
      }       
      else {document.getElementById("noHit").innerHTML = `Found ${document.querySelectorAll('.madeIt').length} results`}
    }, 50);
}
sf.filterHTML = function (id, sel, filter) {
  var a, b, c, i, ii, iii, hit;
  a = sf.getElements(id);
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
        b[ii].classList.add('madeIt');
      } else {
        b[ii].style.display = "none";
        b[ii].classList.remove('madeIt');
      }
    }
  }
};