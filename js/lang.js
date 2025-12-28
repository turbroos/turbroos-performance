/* 
  Sprachumschaltung DE/EN wurde bewusst deaktiviert.
  Alle Inhalte werden statisch in Deutsch dargestellt.
  Diese Datei existiert nur noch, um JS-Fehler zu vermeiden.
*/

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.lang = "de";
  });

  // Dummy-Funktion, falls irgendwo noch onclick="setLang(...)"
  window.setLang = function () {
    return false;
  };
})();
