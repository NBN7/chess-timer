import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLSelectElement> {
  children: JSX.Element;
}

export const Select = ({ children, ...props }: Props) => {
  const selectClassName =
    "w-full p-4 rounded-2xl overflow-scroll cursor-pointer";

  return (
    <select {...props} className={selectClassName}>
      {children}
    </select>
  );
};
