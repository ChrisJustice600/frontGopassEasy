import { View, type DimensionValue } from 'react-native'
import { Svg, Path } from 'react-native-svg'

type IconProps = {
  size?: DimensionValue
  color?: string
}

export function ScannerIcon({ size = 196, color = '#FFF' }: IconProps) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width="100%" height="100%" viewBox="0 0 114 100" fill="none">
        <Path d="M1.16699 15.7866V1.5H16.4562" stroke={color} stroke-width="2" />
        <Path d="M98.1658 1.5L112.452 1.5L112.452 16.7892" stroke={color} stroke-width="2" />
        <Path d="M112.452 84.7134L112.452 99L97.1632 99" stroke={color} stroke-width="2" />
        <Path d="M15.4536 99L1.16699 99L1.16699 83.7108" stroke={color} stroke-width="2" />
      </Svg>
    </View>
  )
}