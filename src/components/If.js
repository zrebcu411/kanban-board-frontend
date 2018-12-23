// @flow

type Props = {
  cond: any,
  children: React$Node
};

export const If = (props: Props) => {
  if (props.cond) return props.children;
  return null;
};
