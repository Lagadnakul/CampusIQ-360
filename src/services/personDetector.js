import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

let model = null;

export async function loadPersonDetector() {
  if (!model) {
    console.log("Loading AI person detection model...");

    model = await cocoSsd.load();

    console.log("AI person detection model loaded.");
  }

  return model;
}

export async function detectPeople(videoElement) {
  if (!model) {
    await loadPersonDetector();
  }

  const predictions = await model.detect(videoElement);

  const people = predictions.filter(
    (prediction) =>
      prediction.class === "person" &&
      prediction.score >= 0.5
  );

  return people;
}