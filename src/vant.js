import {
  // Button,
  // Col,
  // Row,
  Popup,
  // Checkbox,
  // CheckboxGroup,
  // Field,
  // Picker,
  // RadioGroup,
  // Radio,
  // Search,
  // ActionSheet,
  Dialog,
  // PullRefresh,
  Toast,
  // Divider,
  // Empty,
  // List,
  // Progress,
  NavBar,
  // Pagination,
  // Tab,
  // Tabs,
  // Sticky,
  // DatetimePicker,
  // Panel,
  // Cell,
  // CellGroup,
  Icon,
  // Switch,
  // Skeleton,
} from "vant";
import vsButton from "vuesax/dist/vsButton";
import vsInput from "vuesax/dist/vsInput";
import vsDialog from "vuesax/dist/vsDialog";
const components = [
// Button,
  // Col,
  // Row,
  Popup,
  // Checkbox,
  // CheckboxGroup,
  // Field,
  // Picker,
  // RadioGroup,
  // Radio,
  // Search,
  // ActionSheet,
  Dialog,
  // PullRefresh,
  Toast,
  // Divider,
  // Empty,
  // List,
  // Progress,
  NavBar,
  // Pagination,
  // Tab,
  // Tabs,
  // Sticky,
  // DatetimePicker,
  // Panel,
  // Cell,
  // CellGroup,
  Icon,
  // Switch,
  // Skeleton,
];
const install = (Vue) => {
  Vue.use(vsButton);
  Vue.use(vsInput);
  Vue.use(vsDialog);
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$toast = Toast;
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default { install };
