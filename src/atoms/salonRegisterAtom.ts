import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const defaultValueRegister = {
  firstName: '',
  lastName: '',
  email: '',
  businessName: '',
  phoneNumber: '',
  password: '',
};
const salonRegieterAtom = atom({
  key: "salonRegisterAtom",
  default: defaultValueRegister
});

export const useSalonLastData = () => {
  const data = useRecoilValue(salonRegieterAtom);
  const setData = useSetRecoilState(salonRegieterAtom);
  return [data, setData] as [typeof defaultValueRegister, typeof setData];
};

const salonServiceDataAtom = atom({
  key: "salonServiceDataAtom",
  default: {
    for: "",
    about: "",
    where: ""
  },
});

export const useSalonServiceData = () => {
  const data = useRecoilValue(salonServiceDataAtom);
  const setData = useSetRecoilState(salonServiceDataAtom);
  return [data, setData] as [{ for: string; where: string; about: string; }, typeof setData];
};