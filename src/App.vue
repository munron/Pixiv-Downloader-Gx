<template>
  <div id="app">
    <p>pixiv拡張</p>
    <button @click="download">ダウンロード</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { jsPDF } from "jspdf";

@Component
export default class App extends Vue {
  public mounted() {
    this.clickAllView();
  }

  public async download() {
    console.log("ダウンロード開始");
    const htmlImageElements = this.getHTMLImageElements();
    const srces = htmlImageElements.map((el) => el.src);
    // window.open(srces[0]);
    const img = await fetch(srces[0]);
    const blob = await img.blob();
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      console.log(base64data);
      const doc = new jsPDF();
      doc.setFontSize(40);
      const title = "download test";
      console.log(title);
      doc.text(title, 15, 15);
      doc.addImage(base64data as string, "jpg", 30, 30, 100, 100);
      doc.save("pixiv.pdf");
    };
  }

  // すべて見るをクリック
  public clickAllView() {
    const el = [
      ...document.querySelectorAll("button[type*=button]"),
    ].find((el) => /すべて見る/.test(el.innerHTML)) as HTMLElement;
    el.click();
  }

  public getTitle() {
    const el = document.querySelector("#expandable-paragraph-0");
    return el?.textContent ?? "";
  }

  public getHTMLImageElements() {
    return [
      ...document.querySelectorAll("div[role=presentation] img"),
    ] as HTMLImageElement[];
  }

  public getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  background-color: yellow;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

p {
  text-align: center;
  font-size: 20px;
  color: black;
}
</style>
