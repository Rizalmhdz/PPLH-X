
//---------project setting firebase-----------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBAEK9blcK9ZjeIT8kPPWk8_xv7jgwjYQo",
    authDomain: "pplh-70ccb.firebaseapp.com",
    databaseURL: "https://pplh-70ccb-default-rtdb.firebaseio.com",
    projectId: "pplh-70ccb",
    storageBucket: "pplh-70ccb.appspot.com",
    messagingSenderId: "823611849079",
    appId: "1:823611849079:web:a0f8c81197a46a2e1dc972"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, child, onValue, get, set, query, remove, orderByChild, onChildAdded, equalTo, update, orderByKey, limitToLast } 
from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const db = getDatabase();

let nm = sessionStorage.getItem('nama');
let nisnUser = sessionStorage.getItem('nisn');
let groupUser = sessionStorage.getItem('kelompok');
let isConfirmUser = sessionStorage.getItem('konfirmasi');
let floatingBtn = document.getElementById("floatingButton");
        
// ================================= CHAT KELOMPOK ========================================

let anggota_kelompok = {}

let tmp = document.querySelector('#tbody1');
    const que = query(ref(db, "dataSiswa/"));
    onValue(que, (snapshot) => {
        const users = snapshot.val();

        // Objek untuk menyimpan data pengguna yang dikelompokkan berdasarkan kelompok
        const groupedUsers = {};

        // Mengelompokkan pengguna berdasarkan kelompok
        Object.values(users).forEach(user => {
            const kelompok = user.kelompok;
            if (!groupedUsers[kelompok]) {
                groupedUsers[kelompok] = [];
            }
            groupedUsers[kelompok].push(user);
        });

        // Mengurutkan kelompok secara alfabetis
        const sortedGroups = Object.keys(groupedUsers).sort();

        // Membuat baris tabel untuk setiap kelompok
        sortedGroups.forEach(kelompok => {
            const usersInGroup = groupedUsers[kelompok];
            usersInGroup.forEach(user => {
                if(user.kelompok == groupUser){ 
                    if(!anggota_kelompok[user.kelompok]){ 
                        anggota_kelompok[user.kelompok] = {};
                    };
                    if(!anggota_kelompok[user.kelompok][user.nisn]){ 
                        anggota_kelompok[user.kelompok][user.nisn] = {};
                    };
                    anggota_kelompok[user.kelompok][user.nisn] = {
                      nama : user.nama,
                      konfirmasi : user.konfirmasi,
                      guru : false,
                    };
                };
                
            });
        
    });
});


const queA = query(ref(db, "dataKelompok/" + groupUser));
onValue(queA, async (snapshot) => {
    const usersGroup = snapshot.val();
    const usernameGuru = usersGroup.pengawas;

    try {
        const specificRef = ref(db, 'dataGuru/' + usernameGuru);
        const snapshotGuru = await get(specificRef);

        if (snapshotGuru.exists()) {
            // Data ditemukan, lakukan sesuatu dengan snapshotGuru.val()
            const user = snapshotGuru.val();

            if (!anggota_kelompok[groupUser]) { 
                anggota_kelompok[groupUser] = {};
            }
            if (!anggota_kelompok[groupUser][usernameGuru]) { 
                anggota_kelompok[groupUser][usernameGuru] = {};
            }

            anggota_kelompok[groupUser][usernameGuru] = {
                nama : user.name,
                konfirmasi : true,
                guru : true,
              };
        } else {
            // Data tidak ditemukan
            console.log("Data Guru tidak ditemukan.");
        }
    } catch (error) {
        // Tangani kesalahan jika ada
        console.error("Error:", error);
    }
});


    function tambahAnggotaGroupBadge(kelompok){
      
        let anggotKelompokChat = document.getElementById("anggota-kelompok-chat");
        anggotKelompokChat.innerHTML = "";
        $('#namaKelompokRoomChat').text("Kelompok " + kelompok)
        // Mendapatkan array dari semua keys (nama properti) dalam objek
        const keys = Object.keys(anggota_kelompok[kelompok]);
  
        // Iterasi melalui array keys dan akses nilai dari setiap properti
        keys.forEach(key => {
          const user = anggota_kelompok[kelompok][key];
  
           // Membuat elemen span baru
           var newSpan = document.createElement("span");
           let badgeColor = "";
           let nama = ""
           if(user.guru){
            badgeColor = "warning";
            nama = "Gr. " + user.nama;
           } else {
            badgeColor = (user.konfirmasi == true)? "success" : "danger";
            nama = user.nama===nm? "Anda" : user.nama;
           }
           newSpan.className = `me-1 badge text-bg-${badgeColor}`; // Menetapkan kelas CSS
   
           // Membuat teks yang akan ditampilkan di dalam span
           var newText = document.createTextNode(`${nama}`);
   
           // Menambahkan teks ke dalam elemen span
           newSpan.appendChild(newText);
   
           // Menambahkan elemen span ke dalam elemen anggotKelompokChat
           anggotKelompokChat.appendChild(newSpan);
        });
  
         
      }
    

    let chatPopup = document.getElementById('chatPopup');

    console.log(anggota_kelompok[groupUser])
        

        let closeChat = document.getElementById('closeChat')
        closeChat.addEventListener('click', function(){
          chatPopup.style.display = 'none';
          floatingBtn.style.display = 'block';
        })
    
    
        function createBubbleMsg(sender, message, time){
              var bubble = document.createElement('div');
              bubble.textContent = message;
        
              if (sender === nisnUser) {
                var bubbleClass = 'bubble-me';
                bubble.style.float = 'right';
                bubble.style.backgroundColor = '#AAD8D3';
                bubble.style.paddingTop = '10px'; 
                bubble.style.paddingRight = '10px'; 
                bubble.style.minWidth = '50px';
                
              } else {
                bubble.style.float = 'left';
                bubble.style.backgroundColor = '#2F323A';
                bubble.style.paddingTop = '30px'; 
                let namaSender = anggota_kelompok[groupUser][sender].nama;

                    if(anggota_kelompok[groupUser][sender].guru){
                        bubble.style.backgroundColor = '#FFC107';
                        
                        namaSender = "Guru " + anggota_kelompok[groupUser][sender].nama;
                    }
                
                var senderSpan = document.createElement('span');
                    senderSpan.textContent = namaSender;
                
                senderSpan.style.fontSize = '0.8em';
                senderSpan.style.position = 'absolute';
                senderSpan.style.top = '10px'; 
                senderSpan.style.left = '10px'; 
                senderSpan.style.paddingRight = '20px'; 
                senderSpan.style.fontWeight = 'bold';
                
    
                bubble.appendChild(senderSpan);

                bubble.style.minWidth = (namaSender.length * 1 > message.length * 1)? namaSender.length * 1 + 'em' : message.length * 1 + 'em'; // Mengatur lebar minimum bubble
              }
        
              bubble.style.color = '#fff';
              bubble.style.borderRadius = '10px';
              bubble.style.maxWidth = '80%';
              bubble.style.marginBottom = '10px';
              bubble.style.clear = 'both';
              bubble.style.overflow = 'hidden';
              bubble.style.paddingLeft = '10px'; 
              bubble.style.paddingBottom = '20px'; 
              bubble.style.wordWrap = 'break-word';
              bubble.style.position = 'relative'; // Container bubble chat harus dalam posisi relatif

        
              var timeSpan = document.createElement('span');
              timeSpan.textContent = time;
              timeSpan.style.fontSize = '0.6em';
              timeSpan.style.position = 'absolute';
              timeSpan.style.bottom = '5px'; 
              timeSpan.style.right = '5px'; 
              timeSpan.style.padding = '0 5px'; // Padding kiri-kanan minimum untuk span waktu
        
              
        
              // Tambahkan timeSpan ke dalam bubble
              bubble.appendChild(timeSpan);
              
              var chatMessages = document.getElementById('chatMessages');
              chatMessages.appendChild(bubble);
        }
    
        function getTimeStamp(){
            // Mendapatkan tanggal dan waktu saat ini
            const currentDateTime = new Date();
    
            // Mendapatkan tahun
            const year = currentDateTime.getFullYear();
    
            // Mendapatkan bulan (dalam format dua digit)
            const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
    
            // Mendapatkan tanggal (dalam format dua digit)
            const date = String(currentDateTime.getDate()).padStart(2, '0');
    
            // Mendapatkan jam (dalam format dua digit)
            const hours = String(currentDateTime.getHours()).padStart(2, '0');
    
            // Mendapatkan menit (dalam format dua digit)
            const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    
            // Mendapatkan detik (dalam format dua digit)
            const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');
    
            // Mendapatkan milidetik (dalam format tiga digit)
            const milliseconds = String(currentDateTime.getMilliseconds()).padStart(3, '0');
    
            // Gabungkan semua komponen untuk membuat timestamp dalam format yang diinginkan
            const timestamp = `${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}`;
    
            return timestamp
        }
        
        let sendButton = document.getElementById('sendButton')
        sendButton.addEventListener('click', function(){ 
            sendMessage();
        });

        function sendMessage() {
            const message = document.getElementById('messageInput').value.trim();
            const currentTime = new Date();
            const options = { hour: '2-digit', minute: '2-digit', hour12: false };
            const formatter = new Intl.DateTimeFormat('id', options);
            const formattedTime = formatter.format(currentTime);
        
            if (message !== '') {
             const chatMessages = document.getElementById('chatMessages');
    
              set(ref(db, 'dataKelompok/'+ groupUser + '/chatGroup/'+getTimeStamp()), {
                usnPengirim : nisnUser,
                pesan : message,
                pada  : formattedTime
              });
    
            // Auto-scroll ke paling bawah saat ada chat baru
            chatMessages.scrollTop = chatMessages.scrollHeight;
        
            // Kosongkan input teks setelah mengirim
            document.getElementById('messageInput').value = '';
        
            }
        }

        
        
    
        floatingBtn.addEventListener('click', function () {
            document.getElementById('chatPopup').style.display = 'block';
            document.getElementById('floatingButton').style.display = 'none';
            scrollToBottom();
            tambahAnggotaGroupBadge(groupUser);
            sortirBadgeAnggotaKelompok();
            loadMessages();
        });

        function createTooltip(item, pesan){
            item.addEventListener('mouseover', function() {
                // Buat elemen tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = pesan;
            
               // Gaya untuk tooltip
                tooltip.style.position = 'absolute';
                tooltip.style.background = '#333';
                tooltip.style.color = '#fff';
                tooltip.style.padding = '5px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.right = '20px'; // Letakkan di samping kiri tombol
                tooltip.style.bottom = '-290px'; // Letakkan di atas tombol
                        
                // Menambahkan tooltip ke dalam dokumen
                document.body.appendChild(tooltip);
            
                // Menghapus tooltip setelah beberapa detik (opsional)
                setTimeout(function() {
                    tooltip.parentNode.removeChild(tooltip);
                }, 2000);
            });
        }
        


        document.getElementById('chatMessages').addEventListener('scroll', function() {
            var floatingButtonDown = document.getElementById('floatingButtonDown');
        
            // Jika posisi scroll tidak berada di bagian paling bawah
            if (this.scrollTop < (this.scrollHeight - this.clientHeight)) {
                // Munculkan floating button down
                if (!floatingButtonDown) {
                    floatingButtonDown = document.createElement('button');
                    floatingButtonDown.id = 'floatingButtonDown';
                    floatingButtonDown.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2F323A" class="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                    </svg>`;
                    floatingButtonDown.style.position = 'absolute';
                    floatingButtonDown.style.bottom = '80px'; 
                    floatingButtonDown.style.right = '40px';
                    floatingButtonDown.style.width = '40px'; 
                    floatingButtonDown.style.height = '40px'; 
                    floatingButtonDown.style.borderRadius = '50%';
                    floatingButtonDown.style.border = '2px solid #2F323A'; 
                    floatingButtonDown.style.backgroundColor = '#fff'; 
                    floatingButtonDown.style.cursor = 'pointer';
                    floatingButtonDown.onclick = function() {
                        var chatMessages = document.getElementById('chatMessages');
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    };
        
                    document.getElementById('chatPopup').appendChild(floatingButtonDown);
                }
            } else {
                // Sembunyikan floating button down jika posisi scroll berada di bagian paling bawah
                if (floatingButtonDown) {
                    floatingButtonDown.parentNode.removeChild(floatingButtonDown);
                }
            }
        });

// Variabel untuk menyimpan referensi event listener saat ini
let currentListener = null;

function loadMessages() {
    const groupChatRef = ref(db, 'dataKelompok/' + groupUser + '/chatGroup/');
    const que = query(groupChatRef, orderByKey());

    // Hapus event listener sebelumnya jika ada
    if (currentListener) {
        currentListener(); // Panggil event listener untuk menghapusnya
    }

    let prevKey = "";

    // Tambahkan event listener baru untuk kelompok saat ini
    currentListener = onChildAdded(que, (snapshot) => {
        const chatData = snapshot.val();
        if(prevKey == ""){
            showSeparatorWithDate(snapshot.key)
        } else {
            let isCreateSeparator = compareDates(prevKey, snapshot.key);
            (isCreateSeparator)? showSeparatorWithDate(snapshot.key) : "";
        }
        prevKey = snapshot.key;
        createBubbleMsg(chatData.usnPengirim, chatData.pesan, chatData.pada);
        scrollToBottom();
    });
}

function scrollToBottom(){
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

    function sortirBadgeAnggotaKelompok(){
            var spans = document.querySelectorAll("#anggota-kelompok-chat span");
    
            // Membuat array dari nodeList
            var spansArray = [];
    
           // Memasukkan elemen-elemen <span> ke dalam array sementara dan melakukan penggantian nama jika terdiri dari dua kata atau lebih
            spans.forEach(function(span) {
                var text = span.textContent.trim();
                var name = extractName(text);
                if (name.includes(' ')) {
                    name = name.split(' ')[1];
                }
                span.textContent = name;
                spansArray.push({ element: span, name: name });
            });
    
            // Fungsi untuk mengekstrak nama dari teks dan mengembalikan kata kedua jika ada
            function extractName(text) {
                var words = text.split(' ');
                if (words.length > 1) {
                    return words[1];
                }
                return text;
            }
    
            // Mengurutkan elemen-elemen <span> yang tersisa berdasarkan teks yang ada di dalamnya
            spansArray.sort(function(a, b) {
                var textA = a.name.toLowerCase();
                var textB = b.name.toLowerCase();
                return textA.localeCompare(textB);
            });
    
            // Mencari index elemen <span> yang berisi teks "Anda"
            var indexAnda = -1;
            spansArray.forEach(function(span, index) {
                var spanText = span.name.trim();
                if (spanText === "Anda") {
                    indexAnda = index;
                }
            });
    
            // Jika elemen <span> yang berisi teks "Anda" ditemukan
            if (indexAnda !== -1) {
                // Memindahkan elemen <span> yang berisi teks "Anda" ke urutan pertama
                var spanAnda = spansArray.splice(indexAnda, 1)[0];
                spansArray.unshift(spanAnda);
            }
    
            // Mendapatkan parent dari elemen <span>
            var parentElement = document.getElementById("anggota-kelompok-chat");
    
            // Menghapus semua elemen <span> dari parent
            parentElement.innerHTML = "";
    
            spansArray.forEach(function(span) {
                parentElement.appendChild(span.element);
            });
       
    }

    // Fungsi untuk mengonversi timestamp ke format Date
function convertTimestampToDateTime(timestampString) {
    const year = timestampString.slice(0, 4);
    const month = timestampString.slice(4, 6) - 1; // Bulan dimulai dari 0 (Januari)
    const day = timestampString.slice(6, 8);
    const hour = timestampString.slice(8, 10);
    const minute = timestampString.slice(10, 12);
    const second = timestampString.slice(12, 14);
    const millisecond = timestampString.slice(14);

    return new Date(year, month, day, hour, minute, second, millisecond);
}

// Fungsi untuk menampilkan pemisah dengan keterangan hari dan tanggal dari timestamp dalam format `yyyymmddhhmmmsmsm`
function showSeparatorWithDate(timestampString) {
    const timestamp = convertTimestampToDateTime(timestampString); // Mengonversi timestamp ke format Date
    const currentDate = new Date(); // Timestamp hari ini

    const separator = document.createElement('hr'); // Membuat elemen garis pembatas
    separator.style.border = 'none'; // Menghilangkan border dari garis pembatas
    separator.style.borderTop = '2px solid #ccc'; // Menambahkan border di bagian atas garis pembatas
    separator.style.margin = '10px 0'; 
    separator.style.marginBottom = '10px';
    separator.style.clear = 'both';
    separator.style.overflow = 'hidden';
    separator.style.position = 'relative'; 

    // Membuat elemen untuk menampilkan keterangan hari dan tanggal
    const dateInfo = document.createElement('div');
    let today = currentDate.getDate();
    let dayFromTimestamp = timestamp.getDate();

    if (today == dayFromTimestamp) {
        // Jika timestamp hari ini
        dateInfo.textContent = 'Hari ini';
    } 
    else if (today - dayFromTimestamp == 1) {
        // Jika timestamp kemarin
        dateInfo.textContent = 'Kemarin';
    } else if (today - dayFromTimestamp <= 7 ) {
        // Jika masih dalam minggu yang sama dengan hari ini
        const options = { weekday: 'long' };
        dateInfo.textContent = timestamp.toLocaleDateString('id-ID', options);
    } else {
        // Jika berbeda minggu dengan hari ini
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateInfo.textContent = timestamp.toLocaleDateString('id-ID', options);
    }

    dateInfo.style.textAlign = 'center'; // Pusatkan teks

    // Menambahkan elemen keterangan hari dan tanggal ke dalam elemen garis pembatas
    separator.appendChild(dateInfo);

    // Menambahkan garis pembatas beserta keterangan hari dan tanggal ke dalam body
    let chatMessages = document.getElementById("chatMessages")
   chatMessages.appendChild(separator);
}

// Fungsi untuk membandingkan dua tanggal berdasarkan
function compareDates(timestampString1, timestampString2) {
    // Mengambil bagian `yyyymmdd` dari string timestamp
    const date1 = timestampString1.slice(0, 8);
    const date2 = timestampString2.slice(0, 8);

    if (date1 === date2) {
        return 0; // Jika tanggal sama
    } else if (date1 < date2) {
        return 1; // Jika tanggal pertama lebih kecil dari tanggal kedua
    } 
}
