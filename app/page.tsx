
<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Min profil</title>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #172d3d;
  font-family: Arial, sans-serif;
  color: #17202a;
}

header {
  padding: 18px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header strong {
  letter-spacing: 3px;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-weight: bold;
}

.container {
  max-width: 520px;
  margin: 20px auto;
  padding: 12px;
}

.card {
  background: #fff;
  border-radius: 20px;
  min-height: 690px;
  padding: 25px 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 45px #0005;
}

.pattern {
  position: absolute;
  inset: -100px;
  pointer-events: none;
  opacity: .35;
  background: repeating-radial-gradient(
    ellipse at 30% 40%,
    transparent 0 28px,
    #a5afb5 29px 30px,
    transparent 31px 43px
  );
}

.card-content {
  position: relative;
  z-index: 1;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  letter-spacing: 2px;
}

.profile {
  display: flex;
  justify-content: center;
  align-items: end;
  margin-top: 75px;
}

.photo {
  width: 260px;
  height: 330px;
  object-fit: cover;
  background: #dce3e5;
  border-radius: 5px;
}

.age {
  background: white;
  padding: 8px;
  font-size: 32px;
  margin-left: -2px;
}

.name {
  text-align: center;
  font-size: 34px;
  font-weight: 600;
  margin-top: 20px;
  overflow-wrap: anywhere;
}

.birth {
  text-align: center;
  color: #666;
  font-size: 20px;
  margin-top: 8px;
}

.notice {
  margin-top: 100px;
  text-align: center;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #963d45;
  border: 1px solid #963d45;
  padding: 10px;
  border-radius: 5px;
}

.editor {
  background: white;
  padding: 22px;
  border-radius: 15px;
  margin-top: 20px;
}

.editor h2 {
  margin-top: 0;
}

label {
  display: block;
  margin-top: 14px;
  font-size: 13px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.save {
  width: 100%;
  background: #18374a;
  color: white;
  margin-top: 20px;
}

@media(max-width:400px) {
  .photo {
    width: 220px;
    height: 290px;
  }
}
</style>
</head>

<body>

<header>
  <strong>MIN PROFIL</strong>
  <span>✦</span>
</header>

<div class="container">

  <div class="card">

    <div class="pattern"></div>

    <div class="card-content">

      <div class="top">
        <strong>PERSONLIG PROFIL</strong>
        <span>PROFILE</span>
      </div>

      <div class="profile">
        <img id="preview"
             class="photo"
             alt="Profilbild"
             src="">

        <div class="age" id="showAge">—</div>
      </div>

      <div class="name" id="showName">
        DITT NAMN
      </div>

      <div class="birth" id="showBirth">
        Födelsedatum
      </div>

      <div class="notice">
        EJ GILTIG LEGITIMATION
      </div>

    </div>
  </div>

  <div class="editor">

    <h2>Redigera din profil</h2>

    <label>Välj bild</label>
    <input type="file" id="imageInput" accept="image/*">

    <label>Namn</label>
    <input id="nameInput" placeholder="Skriv namn">

    <label>Födelsedatum</label>
    <input type="date" id="birthInput">

    <label>Ålder (om du inte anger födelsedatum)</label>
    <input type="number" id="ageInput" min="1" max="120">

    <button class="save" onclick="updateProfile()">
      Uppdatera profil
    </button>

  </div>

</div>

<script>

function updateProfile() {

  const name =
    document.getElementById("nameInput").value;

  const birth =
    document.getElementById("birthInput").value;

  const age =
    document.getElementById("ageInput").value;

  document.getElementById("showName").textContent =
    name.trim() || "DITT NAMN";

  if (birth) {

    const date = new Date(birth + "T12:00:00");
    const today = new Date();

    let calculated =
      today.getFullYear() - date.getFullYear();

    if (
      today.getMonth() < date.getMonth() ||
      (today.getMonth() === date.getMonth() &&
       today.getDate() < date.getDate())
    ) {
      calculated--;
    }

    document.getElementById("showAge").textContent =
      calculated >= 0 ? calculated : "—";

    document.getElementById("showBirth").textContent =
      date.toLocaleDateString("sv-SE");

  } else {

    document.getElementById("showAge").textContent =
      age || "—";

    document.getElementById("showBirth").textContent =
      "Födelsedatum";
  }
}

document.getElementById("imageInput")
.addEventListener("change", function(event) {

  const file = event.target.files[0];

  if (!file || !file.type.startsWith("image/")) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    document.getElementById("preview").src =
      e.target.result;
  };

  reader.readAsDataURL(file);
});

</script>

</body>
</html>
