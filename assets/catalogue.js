// apps.andesha.studio — filtre du catalogue. Rien n'est envoyé : tout se passe dans la page.
(function () {
  var champ = document.getElementById("filtre");
  if (!champ) return;
  var apps = Array.prototype.slice.call(document.querySelectorAll(".app"));
  var familles = Array.prototype.slice.call(document.querySelectorAll(".famille"));
  var compte = document.querySelector(".compte");
  var sansAccent = function (s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); };
  apps.forEach(function (a) { a.dataset.cle = sansAccent(a.dataset.cherche || ""); });
  champ.addEventListener("input", function () {
    var mots = sansAccent(champ.value.trim()).split(/\s+/).filter(Boolean);
    var n = 0;
    apps.forEach(function (a) {
      var ok = mots.every(function (m) { return a.dataset.cle.indexOf(m) !== -1; });
      a.hidden = !ok; if (ok) n++;
    });
    familles.forEach(function (f) { f.hidden = !f.querySelector(".app:not([hidden])"); });
    compte.textContent = mots.length ? (n ? n + (n > 1 ? " apps" : " app") : "Aucune app ne correspond.") : "";
  });
})();
