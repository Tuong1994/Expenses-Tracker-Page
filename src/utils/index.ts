import moment from "moment";

const utils = {
  uuid: () => {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x100000)
        .toString(16)
        .substring(1);
    return `${s4()}-${s4()}-${s4()}/${s4()}-${s4()}-${s4()}`;
  },

  collapse: (ref: React.RefObject<any>) => {
    if (!ref.current) return;
    if (ref.current === null) return;

    const node = ref.current;
    if (node.style.maxHeight) node.style.maxHeight = "";
    else node.style.maxHeight = `${node.scrollHeight}px`;
  },

  formatClassName: (...classNames: string[]) => {
    return classNames.filter((name) => name).join(" ");
  },

  formatCurrency: (amount: number) => {
    const fomatter = new Intl.NumberFormat("vn", {
      style: "currency",
      currency: "VND",
    });
    return fomatter.format(amount);
  },

  formatDateValue: (date: Date | string, format = "YYYY-MM-DD") => {
    const defaultDate = date ?? new Date();
    return moment(defaultDate).format(format);
  },
};

export default utils;
