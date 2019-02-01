var enterNewItem = document.getElementById("newitem");
document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        var li_element = document.createElement("LI");
        var node = document.createTextNode(enterNewItem.value); // get text from input
        //li_element.appendChild(node);
        document.getElementById("mylist").appendChild(li_element); // ul
        var input_element = document.createElement("INPUT");
        input_element.setAttribute("type", "checkbox");
        input_element.setAttribute("name", "todo");
        //input_element.setAttribute("class", "input-class");
        li_element.appendChild(input_element);
        var span_element = document.createElement("SPAN");
        span_element.appendChild(node);
        li_element.appendChild(span_element);
        enterNewItem.value = "";
    }
});

var inputs = document.getElementsByName("todo");
document.addEventListener('input', function (evt) {
    li_active = document.getElementsByTagName("LI");
    for(var i=0; i<inputs.length; i++){
        if(inputs[i].checked){
            li_active[i].classList.add("done");
        }
        else {
            li_active[i].classList.remove("done");
        }
    }
});