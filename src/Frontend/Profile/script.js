function handleProfileEdit() {
  document.getElementById("name").readOnly = false;
  document.getElementById("name").focus();
  document.getElementById("email").readOnly = false;
  document.getElementById("save-button-profile").style.display = "block";
  document.getElementById("edit-button-profile").style.display = "none";
}
