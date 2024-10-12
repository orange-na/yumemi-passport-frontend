import { ReactNode } from "react";
import styles from "./index.module.css";

export type Props = {
  options: { value?: string | number; label: ReactNode }[];
  name: string;
  defaultValue?: (string | number)[];
  defaultChecked?: boolean;
};

export default function Checkbox(props: Props) {
  return (
    <div className={styles.checkbox_group_horizontal}>
      {props.options.map((option, index) => (
        <div key={index} className={styles.checkbox_item}>
          <input
            type="checkbox"
            name={props.name}
            value={option.value}
            defaultChecked={
              option.value
                ? props.defaultValue?.includes(option.value)
                : props.defaultChecked
            }
            id={
              option.value ? `${props.name}-${option.value}` : `${props.name}`
            }
            className={styles.checkbox}
          />
          <label
            htmlFor={
              option.value ? `${props.name}-${option.value}` : `${props.name}`
            }
            className={styles.checkbox_label}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
