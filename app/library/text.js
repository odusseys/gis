import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { getLocaleString } from '../services/i18n';
import colors from '../styles/colors';

const getColor = color => colors[color] || color || colors.black;

export const Text = ({
  style,
  language,
  name,
  text,
  values,
  color,
  ...rest
}) => {
  return (
    <RNText
      style={StyleSheet.flatten([{ color: getColor(color) }, style])}
      {...rest}
    >
      {text || getLocaleString(language, name, values)}
    </RNText>
  );
};

const styledText = textStyle => ({ style, ...rest }) => (
  <Text style={StyleSheet.flatten([style, textStyle])} {...rest} />
);

const styles = StyleSheet.create({
  smallText: {
    fontSize: 8,
  },
  caption: {
    fontSize: 10,
  },
  body: {
    fontSize: 12,
  },
  subtitle: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
  },
});

export const Caption = styledText(styles.caption);
export const Body = styledText(styles.body);
export const SmallText = styledText(styles.smallText);
export const Subtitle = styledText(styles.subtitle);
export const Title = styledText(styles.title);
