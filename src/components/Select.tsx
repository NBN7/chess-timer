import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLSelectElement> {
  children: JSX.Element;
}

export const Select = ({ children, ...props }: Props) => {
  return (
    <select
      {...props}
      className="w-full p-4 rounded-2xl overflow-scroll cursor-pointer"
    >
      {children}
    </select>
  );
};
