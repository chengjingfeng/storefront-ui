import { shallowMount } from "@vue/test-utils";
import SfSearchBar from "@/components/atoms/SfSearchBar/SfSearchBar.vue";

describe.only("SfSearchBar.vue", () => {
  it("renders a search bar", () => {
    const component = shallowMount(SfSearchBar);
    expect(component.contains(".sf-search-bar")).toBe(true);
  });

  it("renders slot with icon when passed", () => {
    const icon = "<svg class='sf-search-bar__icon'></svg>"
    const component = shallowMount(SfSearchBar, {
      slots: {
        icon
      }
    });
    expect(component.contains(".sf-search-bar__icon")).toBe(true);
  });

  it("renders slot with clear icon when passed", () => {
    const icon = "<span class='sf-search-bar__clear-icon'></span>"
    const component = shallowMount(SfSearchBar, {
      slots: {
        icon
      }
    });
    expect(component.contains(".sf-search-bar__clear-icon")).toBe(true);
  });

  it("renders a search bar without icon when false prop passed", () => {
    const component = shallowMount(SfSearchBar, {
      propsData: {
        icon: false
      }
    });
    expect(component.contains(".sf-search-bar__icon")).toBe(false);
  })

  it("renders placeholder props when passed", () => {
    const placeholder = "Search for...";
    const component = shallowMount(SfSearchBar, {
      propsData: {
        placeholder: placeholder
      }
    });
    expect(component.find('.sf-search-bar__input').attributes("placeholder")).toEqual(placeholder);
  });
});
