import React from 'react';
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import colors from '../assets/constants/colors';
interface CustomCardProps {
  primaryColor?: string;
  secondaryColor?: string;
  height?: number; // Height of the card
  width?: number; // Width of the card
  children?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({
  primaryColor = colors.secondary,
  secondaryColor = colors.secondary,
  height = 200, // Default height
  width = 360, // Default width
  children,
}) => {

  const calculatePath = () => {
    const curveStartX = 0.07 * width;
    const curveStartY = 0.07 * height;
    const curveControlX1 = 0.2 * width;
    const curveControlY1 = 0.99 * height;
    const curveControlX2 = 0.9 * width;
    const curveControlY2 = 0.3 * height;
    const curveEndX = 1.09 * width;
    const curveEndY = 0.8 * height;

    return `M${curveStartX} ${curveStartY} 
            C${curveControlX1} ${curveControlY1}, 
             ${curveControlX2} ${curveControlY2}, 
             ${curveEndX} ${curveEndY} 
             L${1.1 * width} ${1.1 * height} 
             L0 ${1.1 * height} Z`;
  };
  

  return (
    <View style={[styles.container, { height, width }]}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
      >
        <Defs>
        <LinearGradient
          id="gradient"
          x1={-39.258} // Start point of the gradient
          x2={438.229} // End point of the gradient
          y1={-3.704}
          y2={242.248}
          gradientUnits="userSpaceOnUse"
        >
          {/* Start with a lighter version of the secondary color */}
          <Stop offset={0.05} stopColor={secondaryColor} stopOpacity={0.4} />

          {/* Add an intermediate color to blend smoothly */}
          <Stop offset={0.5} stopColor={primaryColor} stopOpacity={0.3} />

          {/* End with the primary color, more subtle */}
          <Stop offset={0.95} stopColor={primaryColor} stopOpacity={0.6} />
        </LinearGradient>

          <ClipPath id="clip">
            <Rect width={width} height={height} rx={22.307} fill="#fff" />
          </ClipPath>
        </Defs>

        <G clipPath="url(#clip)">
          <Rect
            width={width}
            height={height}
            rx={22.307}
            fill="url(#gradient)" // Use dynamic gradient
          />
          <Path
            fill="#fff"
            x={-33}
            y={-9}
            fillOpacity={0.08}
            fillRule="evenodd"
            d={calculatePath()}
            clipRule="evenodd"
          />
          <Path
            fill="#fff"
            fillOpacity={0.08}
            x={-23}
            y={-19}
            
            fillRule="evenodd"
            d={calculatePath()}
            clipRule="evenodd"
          />
        </G>
      </Svg>

      {/* Render children here */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
 
  },
  content: {
   position: 'absolute'


  },
});

export default CustomCard;
