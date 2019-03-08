import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text as RNText, Platform } from "react-native";
import { getLocaleString } from "kiki/services/i18n";
import colors from "kiki/styles/colors";
import Hyperlink from "react-native-hyperlink";

const getColor = color => colors[color] || color || colors.black;
const defaultFontFamily = {
  ...Platform.select({
    android: { fontFamily: "Roboto" }
  })
};
export const Text = ({
  style,
  language,
  name,
  text,
  values,
  color,
  hyperlinks,
  highlightLinks = true,
  ...rest
}) => {
  const contents = (
    <RNText
      style={StyleSheet.flatten([
        {
          color: getColor(color),
          backgroundColor: "rgba(0,0,0,0)",
          ...defaultFontFamily
        },
        style
      ])}
      {...rest}
    >
      {text || getLocaleString(language, name, values)}
    </RNText>
  );
  if (hyperlinks) {
    return (
      <Hyperlink
        linkDefault
        linkStyle={
          highlightLinks
            ? { color: colors.yellow, textDecorationLine: "underline" }
            : {}
        }
      >
        {contents}
      </Hyperlink>
    );
  }
  return contents;
};

const LocaleText = connect(state => ({ language: state.config.language }))(
  Text
);

const styledText = textStyle => ({ style, ...rest }) => (
  <LocaleText style={StyleSheet.flatten([textStyle, style])} {...rest} />
);

const styles = StyleSheet.create({
  smallText: {
    fontSize: 8
  },
  caption: {
    fontSize: 10
  },
  body: {
    fontSize: 12
  },
  subtitle: {
    fontSize: 16
  },
  title: {
    fontSize: 18
  }
});

export const Caption = styledText(styles.caption);
export const Body = styledText(styles.body);
export const SmallText = styledText(styles.smallText);
export const Subtitle = styledText(styles.subtitle);
export const Title = styledText(styles.title);
