# Kişisel Akademik Web Sitesi

Sade HTML + CSS. Derleme aracı yok; dosyayı düzenleyip kaydetmek yeterli.

## Dosyalar

| Dosya | İçerik |
|---|---|
| `index.html` | Ana sayfa: tanıtım, araştırma alanları, son yayınlar, iletişim |
| `ozgecmis.html` | Eğitim, akademik/idari görevler, tez danışmanlığı, kimlikler |
| `yayinlar.html` | Tüm yayınlar (APA 7), arama ve tür süzgeci |
| `projeler.html` | Araştırma projeleri |
| `dersler.html` | Bu yılın dersleri, simülatörler, ders geçmişi |
| `assets/css/style.css` | Tüm görünüm (renkler en üstte `:root` içinde) |
| `assets/js/main.js` | Dil değiştirme, menü, e-posta, yayın süzgeci |
| `assets/img/profil.png` | Profil fotoğrafı (aynı adla değiştirin) |
| `assets/cv.pdf` | İndirilebilir özgeçmiş |

## Sık yapılan güncellemeler

**İki dil:** Her metin iki kez yazılır:
`<span data-l="tr">Türkçe</span><span data-l="en">English</span>`. Yayın künyeleri tek dillidir.

**Yeni yayın:** `yayinlar.html` içinde ilgili bölümün (`intl`, `natl`, `conf`, `book`) en üstüne bir `<li>…</li>` satırı kopyalayıp düzenleyin. Kendi adınız `<span class="me">…</span>` içinde kalırsa kalın görünür. Arama ve sayaç kendiliğinden güncellenir. En yeni üç yayını `index.html` içindeki "Son Yayınlar" listesine de taşıyın.

**E-posta:** `assets/js/main.js` dosyasının başındaki `EPOSTA.kullanici` alanını doldurun. Adres sayfaya betikle eklendiği için spam toplayıcılar okuyamaz. Alan boş kaldıkça e-posta satırı gizlenir.

**Ders materyali:** `dersler.html` içinde ilgili kartın "Materyaller yakında." satırını bir bağlantıyla değiştirin. Dosyaları örneğin `dersler/finans1/` klasörüne koyun.

**Ders simülatörleri:** `dersler/simulatorler/` klasöründeki beş HTML dosyası (muhasebe1, muhasebe2, sirketler-muhasebesi, finans1, finans2) **elle düzenlenmez**. Kaynakları `PROJELERİM\14_Muhasebe_Simulatorleri\kaynak\` (ortak motor ve muhasebe içerikleri) ile `PROJELERİM\12_Finans_Simulatoru\kaynak\` (finans içerikleri) klasörlerindedir. Değişiklikten sonra `python ..\14_Muhasebe_Simulatorleri\kaynak\derle.py` çalıştırın; derleyici dosyaları hem proje klasörlerine hem buraya yazar. Sınamak için: `powershell -ExecutionPolicy Bypass -File ..\14_Muhasebe_Simulatorleri\kaynak\sina.ps1`.

## Önizleme

`index.html` dosyasına çift tıklayın.

## GitHub Pages ile yayınlama

1. GitHub'da **`mmtcaliskan.github.io`** adlı, herkese açık (public) yeni bir depo oluşturun. Ad tam olarak böyle olmalı.
2. **Git olmadan (en kolay):** Depo sayfasında *uploading an existing file* bağlantısına tıklayın. Bu klasörün **içindeki** tüm dosya ve klasörleri sürükleyip bırakın, ardından *Commit changes* düğmesine basın. Not: `.nojekyll` gizli bir dosya olduğu için sürüklemede gözden kaçabilir. Bu site için zorunlu değildir.

   **Git ile (isteğe bağlı, git kurulduktan sonra):**
   ```powershell
   git init
   git add .
   git commit -m "Site ilk sürüm"
   git branch -M main
   git remote add origin https://github.com/mmtcaliskan/mmtcaliskan.github.io.git
   git push -u origin main
   ```
3. Depoda **Settings → Pages → Branch: main / (root)** seçip kaydedin.
4. Birkaç dakika sonra site şu adreste açılır: https://mmtcaliskan.github.io

Sonraki güncellemeler: `git add . ; git commit -m "açıklama" ; git push`

**Kendi alan adı (isteğe bağlı):** Alan adını aldıktan sonra Settings → Pages → Custom domain bölümüne yazın ve DNS'te GitHub'ın belirttiği kayıtları ekleyin.
