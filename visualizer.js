import React from "react";
import ReactDOM from "react-dom";
import {
  SpectrumVisualizer,
  SpectrumVisualizerTheme,
} from "react-audio-visualizers";

function Visualizer() {
  return (
    <SpectrumVisualizer
      audio="https://your.domain.com/yourAudioFile.mp3"
      theme={SpectrumVisualizerTheme.radialSquaredBars}
      colors={["#009688", "#26a69a"]}
      iconsColor="#26a69a"
      backgroundColor="white"
      showMainActionIcon
      showLoaderIcon
      highFrequency={8000}
    />
  );
}

export default Visualizer;
