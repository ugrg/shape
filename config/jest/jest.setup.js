import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import moment from "moment";

configure({
  adapter: new Adapter()
});

moment.updateLocale(moment.locale(), { week: { dow: 0 } });
