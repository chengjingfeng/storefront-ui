import Vue from "vue";

import SfCarouselItem from "./_internal/SfCarouselItem.vue";
import SfArrow from "../../atoms/SfArrow/SfArrow.vue";

import Glide from "@glidejs/glide";

Vue.component("SfCarouselItem", SfCarouselItem);

export default {
  name: "SfCarousel",
  data() {
    return {
      glide: null,
      defaultOptions: {
        type: "carousel",
        rewind: true,
        perView: 4,
        slidePerPage: true,
        breakpoints: {
          768: {
            perView: 2,
            peek: {
              before: 0,
              after: 50
            }
          }
        }
      }
    };
  },
  props: {
    /** Carousel options like glide.js (https://glidejs.com/docs/) */
    options: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    SfArrow
  },
  methods: {
    go(direct) {
      switch (direct) {
        case "<":
          this.glide.go("<");
          break;
        case ">":
          this.glide.go(">");
          break;
      }
    }
  },
  computed: {
    mergedOptions() {
      let breakpoints = { ...this.defaultOptions.breakpoints };

      if (this.options.breakpoints) {
        breakpoints = { ...breakpoints, ...this.options.breakpoints };
      }

      return {
        ...this.defaultOptions,
        ...this.options,
        breakpoints: breakpoints
      };
    }
  },
  mounted: function() {
    const glide = new Glide(this.$refs.glide, this.mergedOptions);
    glide.mount();

    glide.on("run.before", move => {
      const { slidePerPage, rewind, type } = this.mergedOptions;

      if (!slidePerPage) return;

      const { perView } = glide.settings;
      if (!perView > 1) return;

      const size = this.$slots.default.filter(slot => slot.tag).length;
      const { direction } = move;
      let page, newIndex;

      switch (direction) {
        case ">":
        case "<":
          page = Math.ceil(glide.index / perView);
          newIndex = page * perView + (direction === ">" ? perView : -perView);
          if (newIndex >= size) {
            if (type === "slider" && !rewind) {
              newIndex = glide.index;
            } else {
              newIndex = 0;
            }
          } else if (newIndex < 0 || newIndex + perView > size) {
            if (type === "slider" && !rewind) {
              newIndex = glide.index;
            } else {
              newIndex = size - perView;
            }
          }

          move.direction = "=";
          move.steps = newIndex;
      }
    });
    this.glide = glide;
  }
};
