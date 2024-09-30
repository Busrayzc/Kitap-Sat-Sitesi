// Örnek kitap verileri
const books = [
    { title: "Tutunamayanlar", author: "Oğuz Atay", price: 25.99, image: "https://i.dr.com.tr/cache/500x400-0/originals/0000000061424-1.jpg" },
    { title: "Tehlikeli Oyunlar", author: "Oğuz Atay", price: 19.99, image: "https://i.dr.com.tr/cache/600x600-0/originals/0000000061603-1.jpg" },
    { title: "Beyaz Zambaklar Ülkesinde", author: "Grigoriy Petrov", price: 29.99, image: "https://i.dr.com.tr/cache/600x600-0/originals/0001784820001-1.jpg" },
    { title: "Sefiller", author: "Victor Hugo ", price:19.99, image: "https://img.kitapyurdu.com/v1/getImage/fn:130842/wh:true/wi:800" },
    { title: "Vadideki Zambak", author: "Honoré de Balzac ", price:29.99,image: "https://img.kitapyurdu.com/v1/getImage/fn:5655572/wh:true/wi:800" },
    { title: "Suç ve Ceza", author: "Fyodor Dostoyevski", price: 49.99, image: "https://i.dr.com.tr/cache/500x400-0/originals/0000000222780-1.jpg" },
    { title: "Yeraltından Notlar", author: "Fyodor Dostoyevski ", price:19.99, image: "https://i.dr.com.tr/cache/600x600-0/originals/0001798371001-1.jpg" },

//kitaplar bölümünün ismi, yazarı, fiyatı, kitabın resmi yer almaktadır.
];


//anasayfa bölümü için books, çok satanlar bölümü için book kullandık.
const book = [

    { title: "Aşkın Peşinde", author: "John Doe", price:125.99, image: "https://i.dr.com.tr/cache/600x600-0/originals/0000000668142-1.jpg" },
    { title: "Drive", author: "Daniel H. Pink", price: 5.99, image: "https://i.dr.com.tr/cache/500x400-0/originals/0000000345503-1.jpg" },
    { title: "Harry Potter Büyü Kitabı", author: "John Doe", price:55.99, image: "https://i.dr.com.tr/cache/500x400-0/originals/0001963848001-1.jpg" },
    { title: "Hogwarts’tan Güç, Politika ve Sinir Bozucu Hayaletler Üzerine Kısa Hikayeler", author: "J. K. Rowling", price: 25.99, image: "https://cdn.fantastikcanavarlar.com/wp-content/uploads/2016/09/Short-Stories-from-Hogwarts-of-Power-Politics-and-Pesky-Poltergeists.jpg" },
//çok satanlar bölümünün kitap ismi, yazarı, fiyatı, kitabın resmi yer almaktadır.


];


// Çok satanlar bölümüne kitapları ekleyen kısım
//çok satanlar bölümünün kitap ismi, yazarı, fiyatı, kitabın resmi js dilinde eklendi.
//sepete ekle butonu ve like butonu eklendi.
const bestsellersList = document.getElementById("bestsellers-list");
books.forEach((book) => {
    bestsellersList.innerHTML += `
    <div>
      <img src="${book.image}" alt="${book.title}" width="100">
      <p>${book.title} - ${book.author} - ${book.price} TL 
        <button onclick="addToCart('${book.title}', ${book.price})" class="cart-button">Sepete Ekle</button>
        <button onclick="toggleLike('${book.title}', '${book.author}', ${book.price}, '${book.image}')" class="like-button">
          ♥
        </button>
      </p>
    </div>`;
});


// Anasayfa bölümüne kitapları ekleyen kısım
//favoriye ekle butonuna tıklandığında başlık,yazar,fiyat,resim favorilerim bölümüne gider.
const homepage = document.getElementById("homepage");
books.forEach((book) => {
    homepage.innerHTML += `
    <div>
      <img src="${book.image}" alt="${book.title}" width="100">
      <p>${book.title} - ${book.author}
       
        <button onclick="toggleLike('${book.title}', '${book.author}', ${book.price}, '${book.image}')">
          Favoriye Ekle
        </button>
      </p>
    </div>`;
});

// Yeni çıkanlar bölümüne kitapları ekle
const newReleasesList = document.getElementById("new-releases-list");
book.forEach(book => {
    newReleasesList.innerHTML += `
    <div>
      <img src="${book.image}" alt="${book.title}" width="100">
      <p>${book.title} - ${book.author} - ${book.price} TL <button onclick="addToCart('${book.title}', ${book.price})">Sepete Ekle</button></p>
	  <button onclick="toggleLike('${book.title}', '${book.author}', ${book.price}, '${book.image}')">
          Favoriye Ekle
        </button>
    </div>`;
});



// Sepetim bölümü

var cartItems = [];

function addToCart(itemName, price) {
    cartItems.push({ itemName, price });
    updateCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}
//sepetteki ürünlerin toplam fiyatını hesaplayan, sepetten ürün kaldırılmasını sağlayan fonksiyonlar
function updateCart() {
    var cartContainer = document.getElementById('cart-items');
    var cartContainer = document.getElementById('sepet');
    var totalPriceContainer = document.getElementById('total-price');
    var total = 0;

    cartContainer.innerHTML = ''; // Temizle

    cartItems.forEach(function (item, index) {
        var itemDiv = document.createElement('div');
        itemDiv.textContent = item.itemName + ' - TL' + item.price.toFixed(2);

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Kaldır';
        removeButton.onclick = function() {
            removeFromCart(index);
        };

        itemDiv.appendChild(removeButton);

        cartContainer.appendChild(itemDiv);

        total += item.price;
    });

    totalPriceContainer.textContent = 'Toplam: TL' + total.toFixed(2);
}

function checkout() {
    // Sepeti onaylama işlemleri
    alert('Sepetiniz onaylandı!');
}

// Sepeti onayla ve ödeme ekranını göster
function checkout() {
    // Sepetin boş olup olmadığını kontrol et
    if (cartItems.length === 0) {
        alert("Sepetiniz boş. Lütfen önce ürün ekleyin.");
        return;
    }


    // Ödeme ekranını göster, sepet ekranını gizle
    document.getElementById('cart').style.display = 'display';
    document.getElementById('payment-screen').style.display = 'block';
    document.getElementById('payment-options').style.display = 'block';
}
// Sayfa yüklenirken varsayılan olarak kredi/banka kartı seçeneğini seçili hale getir
document.addEventListener('DOMContentLoaded', function () {
    const creditCardOption = document.querySelector('input[name="paymentOption"][value="creditCard"]');
    if (creditCardOption) {
        creditCardOption.checked = true;
    }
});

function completePayment() {
    // Seçilen ödeme seçeneğine göre işlemleri burada gerçekleştir
    const selectedPaymentOption = document.querySelector('input[name="paymentOption"]:checked');

    if (!selectedPaymentOption) {
        alert('Lütfen bir ödeme seçeneği seçin.');
        return;
    }

    if (selectedPaymentOption.value === 'creditCard') {
        // Kredi kartı/banka kartı ödeme işlemleri
        alert('Kredi Kartı / Banka Kartı ile ödeme yapılıyor...');

        // Ödeme ekranını göster
        showPaymentScreen();
    } else if (selectedPaymentOption.value === 'cashOnDelivery') {
        // Kapıda ödeme işlemleri
        alert('Kapıda ödeme yapılıyor...');

        // Ödeme ekranını gizle
        hidePaymentScreen();
    }
}

function showPaymentScreen() {
    // Tüm sekmelerde geriye dönüldüğünde ödeme ekranı bölümünün gösterilmemesini sağlar.
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tabContent => {
        tabContent.style.display = 'display';
    });

    // Ödeme ekranını göster
    const paymentScreen = document.getElementById('payment-screen');
    paymentScreen.style.display = 'block';
}

function hidePaymentScreen() {
    // Ödeme ekranını gizle
    const paymentScreen = document.getElementById('payment-screen');
    paymentScreen.style.display = 'none';
}

// Ödeme işlemini gerçekleştir
function processPayment() {
    alert('Ödeme işlemi tamamlandı. Teşekkür ederiz!');

    // Ödeme ekranını gizle
    document.getElementById('payment-screen').style.display = 'none';
}

// Sayfa yüklendiğinde ödeme ekranını gizle
document.getElementById('payment-screen').style.display = 'none';

// Sepet sayfasına gidildiğinde ödeme ekranını görünür kıl
if (window.location.hash === '#cart') {
    document.getElementById('payment-screen').style.display = 'block';
} else {
    // Başka bir sayfaya gidildiğinde ödeme ekranını gizle
    document.getElementById('payment-screen').style.display = 'none';
}
// Sayfa değişikliğini dinle
window.addEventListener('hashchange', function () {
    // Eğer sayfa değişirse, ödeme ekranını gizle
    document.getElementById('payment-screen').style.display = 'none';

    // Sayfa değiştiğinde sepet sayfasına gidildiyse ödeme ekranını göster
    if (window.location.hash === '#cart') {
        document.getElementById('creditCardOption').checked = true; // Varsayılan olarak kredi/banka kartı seçeneğini seçili hale getir
        document.getElementById('payment-screen').style.display = 'block';
    }
});
// SEPET SON



// Sayfa yüklenirken varsayılan olarak Anasayfa sekmesini göster
document.addEventListener('DOMContentLoaded', function () {
    showTab('homepage');
});

function showTab(tabId) {
    // Tüm sekme içeriklerini gizle
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
    });

    // İstenilen sekme içeriğini göster
    const selectedTabContent = document.getElementById(tabId);
    if (selectedTabContent) {
        selectedTabContent.classList.add('active');
    }
}

// Sayfa yüklenirken varsayılan olarak Anasayfa sekmesini göster
document.addEventListener('DOMContentLoaded', function () {
    showTab('homepage');
});

function showTab(tabId) {
    // Tüm sekme içeriklerini gizle
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
    });

    // İstenilen sekme içeriğini göster
    const selectedTabContent = document.getElementById(tabId);
    if (selectedTabContent) {
        selectedTabContent.classList.add('active');
    }
}



// Arama kutusu ve butonunu seç
const searchInput = document.querySelector('.search-container input');
const searchButton = document.querySelector('.search-container button');

// Arama butonuna tıklanınca arama yap
searchButton.addEventListener('click', performSearch);

// Klavye "Enter" tuşuna basılınca arama yap
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value;
    // Burada arama terimini kullanarak istediğiniz işlemleri gerçekleştirebilirsiniz
    alert('Arama Terimi: ' + searchTerm);
    // Örneğin, bir API'ye sorgu yapabilir veya başka bir işlemi gerçekleştirebilirsiniz.
}

// Sayfa yüklendiğinde anasayfa içeriğini göster
document.addEventListener("DOMContentLoaded", function () {
    showTab("homepage");
});
function showTab(tabName) {
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }

    var selectedTab = document.getElementById(tabName);
    selectedTab.style.display = 'block';
}

function openCategory(categoryName) {
    showTab('category-content');
    loadCategoryContent(categoryName);
}

function loadCategoryContent(categoryName) {
    // Kategori içeriği yüklemek için gerekli işlemler burada gerçekleştirilebilir
    var categoryContent = document.getElementById('category-content');
    categoryContent.innerHTML = "<h2>" + categoryName + " Kategorisi</h2><p>Kategori içeriği burada görünecek.</p>";
}


// Favorilere eklenen kitapları tutan dizi
let favorites = [];

// Favori durumunu kontrol eden fonksiyon
function isBookInFavorites(book) {
    return favorites.some(favorite => favorite.title === book.title);
}

// Kitabı favorilere ekle
function addToFavorites(title, author, price, image) {
    const book = { title, author, price, image };
    favorites.push(book);
    updateFavorites();
}

// Kitabı favorilerden kaldır
function removeFromFavorites(title) {
    favorites = favorites.filter(favorite => favorite.title !== title);
    updateFavorites();
}

// Favorileri güncelle
function updateFavorites() {
    // Favori kitapları göstermek için gerekli işlemler burada gerçekleştirilebilir
    const favoritesList = document.getElementById("favorites-list");
    favoritesList.innerHTML = '';

    favorites.forEach((book) => {
        favoritesList.innerHTML += `
      <div>
        <img src="${book.image}" alt="${book.title}" width="100">
        <p>${book.title} - ${book.author} - ${book.price} TL 
		<button onclick="addToCart('${book.title}', ${book.price})" class="cart-button">Sepete Ekle</button>
          <button onclick="removeFromFavorites('${book.title}')">Favorilerden Kaldır</button>
        </p>
      </div>`;
    });
}
// Favori durumunu kontrol eden fonksiyon
function toggleLike(title, author, price, image) {
    const isLiked = isBookInFavorites({ title, author, price, image });

    if (isLiked) {
        removeFromFavorites(title);
    } else {
        addToFavorites(title, author, price, image);
    }
}





