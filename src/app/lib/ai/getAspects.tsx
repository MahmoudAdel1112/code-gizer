"use client";

import { useAspects } from "../../context/aspectsContext";

export default function getAspects() {
  const { aspects } = useAspects();
  return aspects;
}
