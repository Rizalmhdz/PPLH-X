// ------------------- REFERENCES ----------------

let userlink = document.getElementById("userlink");
let signoutlink = document.getElementById("signoutlink");
let header = document.getElementById("hh");
let namasiswa = document.getElementById("namasiswa");
let nis = document.getElementById("nissiswa");
// var currentUser = null;

// ------------------- Functions ----------------

function Signout() {
  //   sessionStorage.removeItem("user");
  sessionStorage.removeItem("namasiswa");
  sessionStorage.removeItem("kelas");
  sessionStorage.removeItem("sekolah");
  sessionStorage.removeItem("usernameNISN");
  sessionStorage.removeItem("skor jarpin1");
  sessionStorage.removeItem("nilaikuis1");
  sessionStorage.removeItem("nilaikuis2");
  sessionStorage.removeItem("nilaikuis3");
  sessionStorage.removeItem("nilaievaluasi");

  window.location = "login.html";
}

let datanamasiswa = sessionStorage.getItem("namasiswa");
let usernameNISN = sessionStorage.getItem("usernameNISN");

if (datanamasiswa == null) {
  // alert("Silahkan lakukan login terlebih dahulu!");
  window.location = "login.html";
} else {
  // nis.innerHTML = `NIS - ${usernameNISN}`;
  userlink.innerHTML = `<i class="fas fa-user-alt"></i> ${datanamasiswa}`;
  // userlink.innerText = datanamasiswa;
  signoutlink.href = "javascript:Signout()";
}
