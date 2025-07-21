import { styled, Button } from "tamagui";


export const ButtonBase = styled(Button, {
  name: "Button",
  rounded:'$4',
  justify: "center",
  items: "center",
  py: "$2",
  px: "$3",
  
  pressStyle: {
    opacity: 0.7,
    scale: 0.97, // animation nhẹ khi bấm
  },

  variants: {
    size: {
      sm: {
        py: "$1",
        px: "$2",
        height: 32,
      },
      md: {
        py: "$2",
        px: "$3",
        height: 40,
      },
      lg: {
        py: "$3",
        px: "$4",
        height: 52,
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  } as const,

  defaultVariants: {
    size: "md",
  },
});
