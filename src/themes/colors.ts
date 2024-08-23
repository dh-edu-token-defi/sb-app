import {
  blue,
  blueA,
  blueDark,
  blueDarkA,
  green,
  greenDark,
  indigo,
  indigoDark,
  indigoA,
  indigoDarkA,
  mauve,
  mauveA,
  mauveDark,
  mauveDarkA,
  teal,
  tealA,
  tealDark,
  tealDarkA,
  orange,
  orangeDark,
  orangeA,
  orangeDarkA,
  yellow,
  yellowA,
  yellowDark,
  yellowDarkA,
  red,
  redDark,
  gray,
  grayDark,
  lime,
  limeA,
  limeDark,
  limeDarkA,
  slateDark,
  slateDarkA,
  sky,
  skyDark,
  skyA,
  skyDarkA,
} from "@radix-ui/colors";

/*
 * COLORS
 * We're leveraging Radix Colors (https://www.radix-ui.com/colors) for the DAO
 * Haus Component Lib. Additionally we're following the scale provided by Radix.
 * To understand why each alias is mapping to each number in the scale please
 * reference this doc (https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale).
 * Designs for DAO Haus Component Lib can be found here (figma.com/file/R1a1bwODnzCHHHw0EJALAU/DAOhaus-v3-Pattern-Library-(In-Progress)?node-id=1%3A3)
 */

// * Brand Colors

export const primary = {
  step1: orange.orange1,
  step2: orange.orange2,
  step3: orange.orange3,
  step4: orange.orange4,
  step5: orange.orange5,
  step6: orange.orange6,
  step7: orange.orange7,
  step8: orange.orange8,
  step9: orange.orange9,
  step10: orange.orange10,
  step11: orange.orange11,
  step12: orange.orange12,
};

export const primaryA = {
  step1: orangeA.orangeA1,
  step2: orangeA.orangeA2,
  step3: orangeA.orangeA3,
  step4: orangeA.orangeA4,
  step5: orangeA.orangeA5,
  step6: orangeA.orangeA6,
  step7: orangeA.orangeA7,
  step8: orangeA.orangeA8,
  step9: orangeA.orangeA9,
  step10: orangeA.orangeA10,
  step11: orangeA.orangeA11,
  step12: orangeA.orangeA12,
};

export const primaryDark = {
  step1: "#000000",
  step2: orangeA.orangeA2,
  step3: orangeA.orangeA3,
  step4: orangeA.orangeA4,
  step5: orangeA.orangeA5,
  step6: orangeA.orangeA6,
  step7: orangeA.orangeA7,
  step8: orangeA.orangeA8,
  step9: orangeA.orangeA9,
  step10: orangeA.orangeA10,
  step11: orangeA.orangeA11,
  step12: orangeA.orangeA12,
  // step2: "#0b130d",
  // step3: "#102e19",
  // step4: "#093d1c",
  // step5: "#0c4b24",
  // step6: "#145a2e",
  // step7: "#196b37",
  // step8: "#1a7f41",
  // step9: "#11f47b",
  // step10: "#00e971",
  // step11: "#00dd65",
  // step12: "#a7f5ba",
};

export const primaryDarkA = {
  step1: orangeDarkA.orangeA1,
  step2: orangeDarkA.orangeA2,
  step3: orangeDarkA.orangeA3,
  step4: orangeDarkA.orangeA4,
  step5: orangeDarkA.orangeA5,
  step6: orangeDarkA.orangeA6,
  step7: orangeDarkA.orangeA7,
  step8: orangeDarkA.orangeA8,
  step9: orangeDarkA.orangeA9,
  step10: orangeDarkA.orangeA10,
  step11: orangeDarkA.orangeA11,
  step12: orangeDarkA.orangeA12,
};

export const secondary = {
  step1: teal.teal1,
  step2: teal.teal2,
  step3: teal.teal3,
  step4: teal.teal4,
  step5: teal.teal5,
  step6: teal.teal6,
  step7: teal.teal7,
  step8: teal.teal8,
  step9: teal.teal9,
  step10: teal.teal10,
  step11: teal.teal11,
  step12: teal.teal12,
};

export const secondaryA = {
  step1: tealA.tealA1,
  step2: tealA.tealA2,
  step3: tealA.tealA3,
  step4: tealA.tealA4,
  step5: tealA.tealA5,
  step6: tealA.tealA6,
  step7: tealA.tealA7,
  step8: tealA.tealA8,
  step9: tealA.tealA9,
  step10: tealA.tealA10,
  step11: tealA.tealA11,
  step12: tealA.tealA12,
};

export const secondaryDark = {
  step1: "#000000",
  step2: tealDarkA.tealA2,
  step3: tealDarkA.tealA3,
  step4: tealDarkA.tealA4,
  step5: tealDarkA.tealA5,
  step6: tealDarkA.tealA6,
  step7: tealDarkA.tealA7,
  step8: tealDarkA.tealA8,
  step9: tealDarkA.tealA9,
  step10: tealDarkA.tealA10,
  step11: tealDarkA.tealA11,
  step12: tealDarkA.tealA12,
};

export const secondaryDarkA = {
  step1: tealDarkA.tealA1,
  step2: tealDarkA.tealA2,
  step3: tealDarkA.tealA3,
  step4: tealDarkA.tealA4,
  step5: tealDarkA.tealA5,
  step6: tealDarkA.tealA6,
  step7: tealDarkA.tealA7,
  step8: tealDarkA.tealA8,
  step9: tealDarkA.tealA9,
  step10: tealDarkA.tealA10,
  step11: tealDarkA.tealA11,
  step12: tealDarkA.tealA12,
};

// * Neutral Colors

export const neutral = {
  step1: gray.gray1,
  step2: gray.gray2,
  step3: gray.gray3,
  step4: gray.gray4,
  step5: gray.gray5,
  step6: gray.gray6,
  step7: gray.gray7,
  step8: gray.gray8,
  step9: gray.gray9,
  step10: gray.gray10,
  step11: gray.gray11,
  step12: gray.gray12,
};

export const neutralDark = {
  step1: grayDark.gray1,
  step2: grayDark.gray2,
  step3: grayDark.gray3,
  step4: grayDark.gray4,
  step5: grayDark.gray5,
  step6: grayDark.gray6,
  step7: grayDark.gray7,
  step8: grayDark.gray8,
  step9: grayDark.gray9,
  step10: grayDark.gray10,
  step11: grayDark.gray11,
  step12: grayDark.gray12,
};

// * Utility Colors
export const info = {
  step1: orange.orange1,
  step2: orange.orange2,
  step3: orange.orange3,
  step4: orange.orange4,
  step5: orange.orange5,
  step6: orange.orange6,
  step7: orange.orange7,
  step8: orange.orange8,
  step9: orange.orange9,
  step10: orange.orange10,
  step11: orange.orange11,
  step12: orange.orange12,
};

export const infoDark = {
  step1: orangeDark.orange1,
  step2: orangeDark.orange2,
  step3: orangeDark.orange3,
  step4: orangeDark.orange4,
  step5: orangeDark.orange5,
  step6: orangeDark.orange6,
  step7: orangeDark.orange7,
  step8: orangeDark.orange8,
  step9: orangeDark.orange9,
  step10: orangeDark.orange10,
  step11: orangeDark.orange11,
  step12: orangeDark.orange12,
};

export const success = {
  step1: green.green1,
  step2: green.green2,
  step3: green.green3,
  step4: green.green4,
  step5: green.green5,
  step6: green.green6,
  step7: green.green7,
  step8: green.green8,
  step9: green.green9,
  step10: green.green10,
  step11: green.green11,
  step12: green.green12,
};

export const successDark = {
  step1: greenDark.green1,
  step2: greenDark.green2,
  step3: greenDark.green3,
  step4: greenDark.green4,
  step5: greenDark.green5,
  step6: greenDark.green6,
  step7: greenDark.green7,
  step8: greenDark.green8,
  step9: greenDark.green9,
  step10: greenDark.green10,
  step11: greenDark.green11,
  step12: greenDark.green12,
};

export const warning = {
  step1: orange.orange1,
  step2: orange.orange2,
  step3: orange.orange3,
  step4: orange.orange4,
  step5: orange.orange5,
  step6: orange.orange6,
  step7: orange.orange7,
  step8: orange.orange8,
  step9: orange.orange9,
  step10: orange.orange10,
  step11: orange.orange11,
  step12: orange.orange12,
};

export const warningDark = {
  step1: orangeDark.orange1,
  step2: orangeDark.orange2,
  step3: orangeDark.orange3,
  step4: orangeDark.orange4,
  step5: orangeDark.orange5,
  step6: orangeDark.orange6,
  step7: orangeDark.orange7,
  step8: orangeDark.orange8,
  step9: orangeDark.orange9,
  step10: orangeDark.orange10,
  step11: orangeDark.orange11,
  step12: orangeDark.orange12,
};

export const danger = {
  step1: red.red1,
  step2: red.red2,
  step3: red.red3,
  step4: red.red4,
  step5: red.red5,
  step6: red.red6,
  step7: red.red7,
  step8: red.red8,
  step9: red.red9,
  step10: red.red10,
  step11: red.red11,
  step12: red.red12,
};

export const dangerDark = {
  step1: redDark.red1,
  step2: redDark.red2,
  step3: redDark.red3,
  step4: redDark.red4,
  step5: redDark.red5,
  step6: redDark.red6,
  step7: redDark.red7,
  step8: redDark.red8,
  step9: redDark.red9,
  step10: redDark.red10,
  step11: redDark.red11,
  step12: redDark.red12,
};
