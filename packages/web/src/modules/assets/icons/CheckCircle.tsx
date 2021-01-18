import { createIcon } from "@chakra-ui/icons";

const paths = [
  () => <ellipse fill="currentColor" cx="256" cy="256" rx="256" ry="255.832" />,
  () => (
    <polygon
      fill="#FFFFFF"
      points="235.472,392.08 114.432,297.784 148.848,253.616 223.176,311.52 345.848,134.504 
  391.88,166.392 "
    />
  ),
];

export const CheckCircleIcon = createIcon({
  displayName: "UpDownIcon",
  viewBox: "0 0 515 512",
  path: paths.map((E, i) => <E key={i} />),
});
