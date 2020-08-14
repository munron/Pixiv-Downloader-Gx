import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
window.onload = async () => {
  const searchBar = document.querySelector('#root');
  if (searchBar) {
    searchBar.insertAdjacentHTML(
      'afterbegin',
      '<div id="app"></div>',
    );
    new Vue({
      render: (h) => h(App),
    }).$mount('#app');
  }

  if (/i.pximg.net/.test(location.href)) {
    console.log("画像のBASE64化を開始します");
    const img = document.querySelector("img");
    console.log(img);
    const base64 = getBase64Image(img!);
    console.log(base64)
  }

};

function getBase64Image(img: HTMLImageElement) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
