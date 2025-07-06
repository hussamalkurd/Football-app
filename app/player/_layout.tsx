import { Stack } from 'expo-router';
import React from 'react';

export default function PlayerStackLayout() {
  return <Stack screenOptions={{ headerShown: true, title: 'Player Details' }} />;
} 