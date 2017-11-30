
function setTransformPerspectiveListener() {
    $(document).mousemove(transformPerspective);
}

function setMouseOverListeners() {
    $('.social').children()
	.mouseover(mouseOverSocialIcon)
	.mouseout(mouseOutSocialIcon);
}

function main() {
    setMouseOverListeners();
    setTransformPerspectiveListener();
}

// HELPERS
function prefixStyles(styleDict) {
    var output = {}
    for (key in styleDict) {
	var val = styleDict[key];
	output[key] = val;
	output['-webkit-'+key] = val;
	output['-moz-'+key] = val;
	output['-o-'+key] = val;
	output['-ms-'+key] = val;
    }
    return output
}

function transformPerspective(event) {
    var mid = $(document).width() / 2.0;
    var multiplier = (mid - event.pageX) / mid;
    var amount = 10 * multiplier;
    console.log(amount);
    $('body').css(prefixStyles({'transform': 'perspective(1000px) rotateY('+amount+'deg)'}));
}

function mouseOverSocialIcon(event) {
    $(event.target).stop().animate({ 'top': '-5px' }, 300);
}

function mouseOutSocialIcon(event) {
    $(event.target).stop().animate({ 'top': '0' }, 300);
}



$(document).ready(main);

// ROUTING attempt
// var currElt = null;
     
// function registerSection(sectionID) {
//     var elt = document.getElementById(sectionID);
//     elt.parentElement.removeChild(elt);
//     console.log(elt);
//     return elt;
// }

// var curr = null;
// var about = registerSection('about');
// var error = registerSection('404');

// function renderSection(section) {
//     if (curr != null) {
// 	curr.parentElement.removeChild(curr);
//     }
//     console.log(section.id);
//     document.getElementById('content').appendChild(section);
//     curr = section;
// }

// var routePath = function(route) {
//     console.log('nav to '+route.id);
//     if (route == '#/about/') {
// 	renderSection(about);
//     } else if (route == '#/404/') {
// 	renderSection(error);          
//     }
// }

// window.onload = function() { routePath(about) }
