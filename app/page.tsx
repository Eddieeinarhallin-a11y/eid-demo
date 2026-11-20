const byId = (id) => document.getElementById(id);

function ageFromDate(value) {
  if (!value) return null;
  const birth = new Date(`${value}T12:00:00`);
  if (Number.isNaN(birth.getTime()) || birth > new Date()) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (now.getMonth() < birth.getMonth() ||
      (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--;
  return age >= 0 ? age : null;
}

function updateProfile() {
  const name = byId("name").value.trim() || "Namn saknas";
  const birth = byId("birth").value;
  const calculatedAge = ageFromDate(birth);
  const enteredAge = byId("age").value;
  byId("displayName").textContent = name;
  byId("displayAge").textContent = calculatedAge ?? (enteredAge ? `${enteredAge} år` : "—");
  byId("displayBirth").textContent = birth
    ? new Date(`${birth}T12:00:00`).toLocaleDateString("sv-SE")
    : "—";
}

byId("save").addEventListener("click", updateProfile);
byId("name").addEventListener("input", updateProfile);
byId("birth").addEventListener("input", () => {
  if (byId("birth").value) byId("age").value = "";
  updateProfile();
});
byId("age").addEventListener("input", () => {
  if (byId("age").value) byId("birth").value = "";
  updateProfile();
});

byId("photo").addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("Välj en bildfil.");
    event.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    byId("portrait").src = reader.result;
    byId("portrait").hidden = false;
    byId("portraitFallback").hidden = true;
  };
  reader.readAsDataURL(file);
});

updateProfile();
