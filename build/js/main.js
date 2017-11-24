var currElt = null;
     
function registerSection(sectionID) {
    var elt = document.getElementById(sectionID);
    elt.parentElement.removeChild(elt);
    console.log(elt);
    return elt;
}

var curr = null;
var about = registerSection('about');
var error = registerSection('404');

function renderSection(section) {
    if (curr != null) {
	curr.parentElement.removeChild(curr);
    }
    console.log(section.id);
    document.getElementById('content').appendChild(section);
    curr = section;
}

var routePath = function(route) {
    console.log('nav to '+route.id);
    if (route == '#/about/') {
	renderSection(about);
    } else if (route == '#/404/') {
	renderSection(error);          
    }
}

window.onload = function() { routePath(about) }
