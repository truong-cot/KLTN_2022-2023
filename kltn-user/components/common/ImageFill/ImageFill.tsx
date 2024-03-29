import ImageWithFallback from "../Image/ImageWithFallback";
import clsx from "clsx";
import styles from "./ImageFill.module.scss";
import { useStyleClass } from "~/common/hooks/usStyleClass";

function ImageFill({ src, className, ...props }: any) {
  const styleClass = useStyleClass(props, styles);

  return (
    <div className={styles.container}>
      <div className={clsx(styles.main, className, styleClass)}>
        <ImageWithFallback src={src} layout="fill" />
      </div>
    </div>
  );
}

export default ImageFill;
