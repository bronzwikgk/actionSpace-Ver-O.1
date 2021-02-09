// document.addEventListener('DOMContentLoaded', function() {
//     var checkPageButton = document.getElementById('clickIt');
//     checkPageButton.addEventListener('click', function() {
//       chrome.tabs.getSelected(null, function(tab) {
//         alert("Hello..! It's my first chrome extension.");
//       });
//     }, false);
//   }, false);


document.getElementById('html2Json').addEventListener('click', hello);

function hello() {
  chrome.tabs.executeScript({
    file: 'ehhDataProcessorV5.js'
  });
  var manifest = chrome.runtime.getManifest(); 
  console.log("manifest",manifest);
  window.close();
}




function click(e) {
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
  window.close();
}



// document.getElementById("clicked-btn").addEventListener("click", function(e) {
//   chrome.runtime.sendMessage({'myPopupIsOpen': true});
// });