import styles from "./index.module.css";

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

export default function Checkbox(props: Props) {
  return (
    <div className={styles.checkboxItem}>
      <input
        type="checkbox"
        id={props.id}
        className={styles.checkbox}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={props.id} className={styles.checkboxLabel}>
        {props.label}
      </label>
    </div>
  );
}
