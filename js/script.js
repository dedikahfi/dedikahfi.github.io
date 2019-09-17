document.addEventListener("DOMContentLoaded", function() {
	// Menampilkan drawer layaknya aplikasi native, dan memanggil sidebar
	var elems = document.querySelector(".sidenav");
	M.Sidenav.init(elems);
	loadNav();

	function loadNav() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				if (this.status == 200){
					// Muat daftar menu pada sidenav dan topnav
					document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
						elm.innerHTML = xhttp.responseText;
					});

					// Listener nav
					document.querySelectorAll(".topnav a, .sidenav a").forEach(function(elm) {
						// Call listener every nav
						elm.addEventListener("click", function(event) {
							// Menutup drawer
							var sidenav = document.querySelector(".sidenav");
							M.Sidenav.getInstance(sidenav).close();

							//Call function loadPage()
							var pageCall = event.target.getAttribute("href").substr(1);
							loadPage(pageCall);
						});
					});
				} else {
					return;
				}
			}
		}
		xhttp.open("GET", "nav.html", true);
		xhttp.send();
	}


	// Navigasi untuk content
	var page = window.location.hash.substr(1);
	if (page == "") page = "home";
	loadPage(page);

	function loadPage(page) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				var content = document.querySelector("#body-content");
				if (this.status == 200) {
					content.innerHTML = xhttp.responseText ;
				} else if (this.status == 404) {
					content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
				} else {
					content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
				}
			}
		}
		xhttp.open("GET", "pages/" + page + ".html", true);
		xhttp.send();
	}

});