import { atom } from "recoil";

export const userAtom = atom({
  key: "user",
  default: []
})

export const balanceAtom = atom({
  key: "balanceAmount",
  default: 0
})
