$(document).ready(function() {
  var popModal = document.getElementById('pop-up-modal');

  var popImg = document.getElementById('pop-up-img');
  var popModalImg = document.getElementById('infoman')
  var popCaptionText = document.getElementById('pop-up-caption');
  popImg.onclick = function() {
    popModal.style.display = "block";
    popModalImg.src = this.src;
    popCaptionText.innerHTML = this.alt;
  }

  var popSpan = document.getElementsByClassName('pop-up-close')[0];
  popSpan.onclick = function() {
    popModal.style.display = "none";
  }

  window.onload = function() {
    document.getElementById('pop-up-img').click();
  }
});
