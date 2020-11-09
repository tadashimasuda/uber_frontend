<template>
  <div class="text-center">
    <!-- <button
      class="btn btn-primary btn-lg bg-success border-0"
      ref="capture"
    > -->
    <div class="wrap mb-3">
        <div class="button border bg-success text-light py-1" ref="capture">投稿する</div>
    </div>
      <!-- 投稿
    </button> -->
  </div>
</template>

<script>
export default {
  mounted() {
    const elm = this.$refs.capture;
    const self = this;
    this.$nextTick(() => {
      if (process.client) {
        const h2c = require("html2canvas");
        elm.addEventListener("click", () => {
          self.$store.dispatch("post/setLoading", true);
          window.scrollTo(0, 0);
          h2c(document.querySelector("#image")).then(canvas => {
            canvas.toBlob(blob => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = function () {
                const dataURL = this.result;
                self.handleClick(dataURL);
              };
            });
          });
        });
      }
    });
  },
  methods: {
    handleClick(dataURL) {
      this.$emit("click", dataURL);
    },
  },
};
</script>