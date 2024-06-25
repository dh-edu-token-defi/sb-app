import {
  blue,
  blueDark,
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
  orange,
  orangeDark,
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
  step1: yellow.yellow1,
  step2: yellow.yellow2,
  step3: yellow.yellow3,
  step4: yellow.yellow4,
  step5: yellow.yellow5,
  step6: yellow.yellow6,
  step7: yellow.yellow7,
  step8: yellow.yellow8,
  step9: yellow.yellow9,
  step10: yellow.yellow10,
  step11: yellow.yellow11,
  step12: yellow.yellow12,
};

export const primaryA = {
  step1: yellowA.yellowA1,
  step2: yellowA.yellowA2,
  step3: yellowA.yellowA3,
  step4: yellowA.yellowA4,
  step5: yellowA.yellowA5,
  step6: yellowA.yellowA6,
  step7: yellowA.yellowA7,
  step8: yellowA.yellowA8,
  step9: yellowA.yellowA9,
  step10: yellowA.yellowA10,
  step11: yellowA.yellowA11,
  step12: yellowA.yellowA12,
};

export const primaryDark = {
  step1: "#000000",
  step2: yellowA.yellowA2,
  step3: yellowA.yellowA3,
  step4: yellowA.yellowA4,
  step5: yellowA.yellowA5,
  step6: yellowA.yellowA6,
  step7: yellowA.yellowA7,
  step8: yellowA.yellowA8,
  step9: yellowA.yellowA9,
  step10: yellowA.yellowA10,
  step11: yellowA.yellowA11,
  step12: yellowA.yellowA12,
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
  step1: yellowDarkA.yellowA1,
  step2: yellowDarkA.yellowA2,
  step3: yellowDarkA.yellowA3,
  step4: yellowDarkA.yellowA4,
  step5: yellowDarkA.yellowA5,
  step6: yellowDarkA.yellowA6,
  step7: yellowDarkA.yellowA7,
  step8: yellowDarkA.yellowA8,
  step9: yellowDarkA.yellowA9,
  step10: yellowDarkA.yellowA10,
  step11: yellowDarkA.yellowA11,
  step12: yellowDarkA.yellowA12,
};

export const secondary = {
  step1: mauve.mauve1,
  step2: mauve.mauve2,
  step3: mauve.mauve3,
  step4: mauve.mauve4,
  step5: mauve.mauve5,
  step6: mauve.mauve6,
  step7: mauve.mauve7,
  step8: mauve.mauve8,
  step9: mauve.mauve9,
  step10: mauve.mauve10,
  step11: mauve.mauve11,
  step12: mauve.mauve12,
};

export const secondaryA = {
  step1: mauveA.mauveA1,
  step2: mauveA.mauveA2,
  step3: mauveA.mauveA3,
  step4: mauveA.mauveA4,
  step5: mauveA.mauveA5,
  step6: mauveA.mauveA6,
  step7: mauveA.mauveA7,
  step8: mauveA.mauveA8,
  step9: mauveA.mauveA9,
  step10: mauveA.mauveA10,
  step11: mauveA.mauveA11,
  step12: mauveA.mauveA12,
};

export const secondaryDark = {
  step1: "#000000",
  step2: yellowDarkA.yellowA2,
  step3: yellowDarkA.yellowA3,
  step4: yellowDarkA.yellowA4,
  step5: yellowDarkA.yellowA5,
  step6: yellowDarkA.yellowA6,
  step7: yellowDarkA.yellowA7,
  step8: yellowDarkA.yellowA8,
  step9: yellowDarkA.yellowA9,
  step10: yellowDarkA.yellowA10,
  step11: yellowDarkA.yellowA11,
  step12: yellowDarkA.yellowA12,
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

export const secondaryDarkA = {
  step1: yellowDarkA.yellowA1,
  step2: yellowDarkA.yellowA2,
  step3: yellowDarkA.yellowA3,
  step4: yellowDarkA.yellowA4,
  step5: yellowDarkA.yellowA5,
  step6: yellowDarkA.yellowA6,
  step7: yellowDarkA.yellowA7,
  step8: yellowDarkA.yellowA8,
  step9: yellowDarkA.yellowA9,
  step10: yellowDarkA.yellowA10,
  step11: yellowDarkA.yellowA11,
  step12: yellowDarkA.yellowA12,
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
  step1: blue.blue1,
  step2: blue.blue2,
  step3: blue.blue3,
  step4: blue.blue4,
  step5: blue.blue5,
  step6: blue.blue6,
  step7: blue.blue7,
  step8: blue.blue8,
  step9: blue.blue9,
  step10: blue.blue10,
  step11: blue.blue11,
  step12: blue.blue12,
};

export const infoDark = {
  step1: blueDark.blue1,
  step2: blueDark.blue2,
  step3: blueDark.blue3,
  step4: blueDark.blue4,
  step5: blueDark.blue5,
  step6: blueDark.blue6,
  step7: blueDark.blue7,
  step8: blueDark.blue8,
  step9: blueDark.blue9,
  step10: blueDark.blue10,
  step11: blueDark.blue11,
  step12: blueDark.blue12,
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
