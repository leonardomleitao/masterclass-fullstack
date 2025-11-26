import "react-native-get-random-values";
import { Redirect, Href } from "expo-router";
import React from "react";

export default function Index() {
  return <Redirect href={"/screens/(external)/auth" as Href} />;
}
