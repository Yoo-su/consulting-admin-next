type Props = {
  pathname: string;
  href: string;
};
export const isNavItemActive = ({ pathname, href }: Props) => {
  return pathname === href;
};
