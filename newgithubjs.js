var position = 0;
var i;
var x;
var xmlDoc;

function loadDoc() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            presentproduct(this);
        }
    }

    xhttp.open("GET", "Default.aspx", true);

    xhttp.send();

    showtextbox(position);

}
function presentproduct(xml) {
    xmlDoc = xml.responseXML;

    var table = "<tr> <th>ProductID</th> <th>ProductName</th> <th>ProductPrice</th> <th>ProductQuantity</th></tr>";
    x = xmlDoc.getElementsByTagName("Product");

    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
            x[i].getElementsByTagName("ProductID")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("ProductName")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("ProductPrice")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("ProductQuantity")[0].childNodes[0].nodeValue +
            "</td>" +
            //pic[i].childNodes[0].nodeValue +<td></td>
            "</tr>";
    }
    document.getElementById("demo").innerHTML = table;

}
function showtextbox(pospar) {
    document.getElementById("txtProductID").value =
        x[pospar].getElementsByTagName("ProductID")[0].childNodes[0].nodeValue;
    document.getElementById("txtProductName").value =
        x[pospar].getElementsByTagName("ProductName")[0].childNodes[0].nodeValue;
    document.getElementById("txtProductPrice").value =
        x[pospar].getElementsByTagName("ProductPrice")[0].childNodes[0].nodeValue;
    document.getElementById("txtProductQuantity").value =
        x[pospar].getElementsByTagName("ProductQuantity")[0].childNodes[0].nodeValue;

    // document.getElementById("txtproductpicture").value =
    //  x[position].getElementsByTagName("productpicture")[0].childNodes[0].nodeValue;
}

function next() {
    if (position < x.length - 1) {
        position++;
        showtextbox(position);


    }
}
function Last() {

    position = x.length - 1;
    showtextbox(position);

}
function First() {

    position = 0;
    showtextbox(position);

}
function previous() {
    if (position > 0) {
        position--;
        showtextbox(position);
    }
}
var params = "";
function btnUpdate(act) {
    params = "";
    params = "?ProductID=" +
        document.getElementById("txtProductID").value + "&ProductName=" +
        document.getElementById("txtProductName").value + "&ProductPrice=" +
        document.getElementById("txtProductPrice").value + "&ProductQuantity=" +
        document.getElementById("txtProductQuantity").value + "&act=" + act;
    alert(params);
    updateDoc(params)
}
function updateDoc(params) {
    //send requests 2 server.....
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            presentproduct(this);
        }
    };
    //send request 2 server
    xhttp.open("GET", "Default.aspx" + params, true);
    xhttp.send();
}

function saerchfn() {
    var sname = xmlDoc.getElementsByTagName("ProductName");
    var txtname = document.getElementById("search").value;
    var match = false;

    for (var i = 0; i < sname.length; i++) {
        if (sname[i].childNodes[0].nodeValue == txtname) {
            match = true;
            showtextbox(i);
        }
    }
    if (match == false) {

        document.getElementById("alertDiv").innerHTML = "<div class='alert alert-danger alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>No Match Found!</strong>  The value you entered returned no match</div>";

    }

}
Document.onreadystatechange = loadDoc();