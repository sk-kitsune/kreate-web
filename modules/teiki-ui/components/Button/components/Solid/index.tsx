import cx from "classnames";
import * as React from "react";

import styles from "./index.module.scss";

const SIZE_TO_CLASS_NAME = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

const COLOR_TO_CLASS_NAME = {
  green: styles.colorGreen,
  white: styles.colorWhite,
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
};

type Props = {
  className?: string;
  style?: React.CSSProperties;

  as?: "button" | "div";
  content?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: keyof typeof SIZE_TO_CLASS_NAME;
  color?: keyof typeof COLOR_TO_CLASS_NAME;
  circular?: boolean;
  title?: string;
  buttonRef?: React.Ref<HTMLElement>;
} & React.ButtonHTMLAttributes<HTMLElement>;

function Solid$({
  className,
  style,
  as = "button",
  content,
  children,
  icon,
  iconPosition = "left",
  size = "medium",
  color = "green",
  circular = false,
  title,
  buttonRef,
  ...others
}: Props) {
  const Component = as;
  const iconLeft = iconPosition === "left" ? icon : undefined;
  const body: React.ReactNode = circular ? undefined : content || children;
  const iconRight = iconPosition === "right" ? icon : undefined;
  return (
    <Component
      // NOTE: from @sk-kitsune: it is totally fine to pass `ref={buttonRef}`
      // because `HTMLElement` is a super class of both `HTMLDivElement`
      // and `HTMLButtonElement`.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={buttonRef as any}
      className={cx(
        styles.container,
        className,
        SIZE_TO_CLASS_NAME[size],
        COLOR_TO_CLASS_NAME[color],
        circular ? styles.circular : null
      )}
      style={style}
      title={
        title != null ? title : typeof body === "string" ? body : undefined
      }
      type="button"
      {...others}
    >
      {iconLeft ? ( //
        <div className={styles.iconLeft}>{iconLeft}</div>
      ) : undefined}
      {body ? ( //
        <div className={styles.body}>{body}</div>
      ) : undefined}
      {iconRight ? ( //
        <div className={styles.iconRight}>{iconRight}</div>
      ) : undefined}
    </Component>
  );
}

const Solid = React.forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <Solid$ buttonRef={ref} {...props} />
));

Solid.displayName = "Solid";

export default Solid;
