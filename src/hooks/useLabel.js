import { useSelector } from "react-redux";
import { selectAllLabels, selectLabelIds } from "../features/labels/slices";

const useLabel = () => {
  const allLabels = useSelector(selectAllLabels);
  const labelIds = useSelector(selectLabelIds);

  return { allLabels, labelIds };
};

export default useLabel;
