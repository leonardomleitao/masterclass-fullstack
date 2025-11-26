import { View, StyleSheet } from "react-native";
import React from "react";

export interface PillCardProps {
  height?: number;
  topColor: string;
  bottomColor: string;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export default function PillCard(props: PillCardProps) {
  const {
    height = 150,
    topColor,
    bottomColor,
    topContent,
    bottomContent,
  } = props;

  return (
    <View style={[styles.container, { height, backgroundColor: topColor }]}>
      <View style={[styles.topBgContent, { backgroundColor: bottomColor }]}>
        <View style={[styles.topContent, { backgroundColor: topColor }]}>
          {topContent ? topContent : null}
        </View>
      </View>
      <View style={[styles.bottomBgContent, { backgroundColor: topColor }]}>
        <View style={[styles.bottomContent, { backgroundColor: bottomColor }]}>
          {bottomContent ? bottomContent : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 16,
  },
  topBgContent: {
    flex: 1,
  },
  topContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 35,
    gap: 10,
  },
  bottomBgContent: {
    flex: 1,
  },
  bottomContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderTopRightRadius: 35,
    gap: 10,
  },
});
